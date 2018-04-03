package daara.kebemer.sn.web.rest;

import daara.kebemer.sn.DaaraApp;

import daara.kebemer.sn.domain.Inscrit;
import daara.kebemer.sn.domain.Eleve;
import daara.kebemer.sn.domain.Classe;
import daara.kebemer.sn.repository.InscritRepository;
import daara.kebemer.sn.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static daara.kebemer.sn.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InscritResource REST controller.
 *
 * @see InscritResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DaaraApp.class)
public class InscritResourceIntTest {

    private static final LocalDate DEFAULT_DATE_INSCRIT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_INSCRIT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private InscritRepository inscritRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInscritMockMvc;

    private Inscrit inscrit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InscritResource inscritResource = new InscritResource(inscritRepository);
        this.restInscritMockMvc = MockMvcBuilders.standaloneSetup(inscritResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Inscrit createEntity(EntityManager em) {
        Inscrit inscrit = new Inscrit()
            .dateInscrit(DEFAULT_DATE_INSCRIT);
        // Add required entity
        Eleve etudiant = EleveResourceIntTest.createEntity(em);
        em.persist(etudiant);
        em.flush();
        inscrit.setEtudiant(etudiant);
        // Add required entity
        Classe niveau = ClasseResourceIntTest.createEntity(em);
        em.persist(niveau);
        em.flush();
        inscrit.setNiveau(niveau);
        return inscrit;
    }

    @Before
    public void initTest() {
        inscrit = createEntity(em);
    }

    @Test
    @Transactional
    public void createInscrit() throws Exception {
        int databaseSizeBeforeCreate = inscritRepository.findAll().size();

        // Create the Inscrit
        restInscritMockMvc.perform(post("/api/inscrits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscrit)))
            .andExpect(status().isCreated());

        // Validate the Inscrit in the database
        List<Inscrit> inscritList = inscritRepository.findAll();
        assertThat(inscritList).hasSize(databaseSizeBeforeCreate + 1);
        Inscrit testInscrit = inscritList.get(inscritList.size() - 1);
        assertThat(testInscrit.getDateInscrit()).isEqualTo(DEFAULT_DATE_INSCRIT);
    }

    @Test
    @Transactional
    public void createInscritWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inscritRepository.findAll().size();

        // Create the Inscrit with an existing ID
        inscrit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInscritMockMvc.perform(post("/api/inscrits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscrit)))
            .andExpect(status().isBadRequest());

        // Validate the Inscrit in the database
        List<Inscrit> inscritList = inscritRepository.findAll();
        assertThat(inscritList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateInscritIsRequired() throws Exception {
        int databaseSizeBeforeTest = inscritRepository.findAll().size();
        // set the field null
        inscrit.setDateInscrit(null);

        // Create the Inscrit, which fails.

        restInscritMockMvc.perform(post("/api/inscrits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscrit)))
            .andExpect(status().isBadRequest());

        List<Inscrit> inscritList = inscritRepository.findAll();
        assertThat(inscritList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInscrits() throws Exception {
        // Initialize the database
        inscritRepository.saveAndFlush(inscrit);

        // Get all the inscritList
        restInscritMockMvc.perform(get("/api/inscrits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inscrit.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateInscrit").value(hasItem(DEFAULT_DATE_INSCRIT.toString())));
    }

    @Test
    @Transactional
    public void getInscrit() throws Exception {
        // Initialize the database
        inscritRepository.saveAndFlush(inscrit);

        // Get the inscrit
        restInscritMockMvc.perform(get("/api/inscrits/{id}", inscrit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(inscrit.getId().intValue()))
            .andExpect(jsonPath("$.dateInscrit").value(DEFAULT_DATE_INSCRIT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInscrit() throws Exception {
        // Get the inscrit
        restInscritMockMvc.perform(get("/api/inscrits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInscrit() throws Exception {
        // Initialize the database
        inscritRepository.saveAndFlush(inscrit);
        int databaseSizeBeforeUpdate = inscritRepository.findAll().size();

        // Update the inscrit
        Inscrit updatedInscrit = inscritRepository.findOne(inscrit.getId());
        // Disconnect from session so that the updates on updatedInscrit are not directly saved in db
        em.detach(updatedInscrit);
        updatedInscrit
            .dateInscrit(UPDATED_DATE_INSCRIT);

        restInscritMockMvc.perform(put("/api/inscrits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInscrit)))
            .andExpect(status().isOk());

        // Validate the Inscrit in the database
        List<Inscrit> inscritList = inscritRepository.findAll();
        assertThat(inscritList).hasSize(databaseSizeBeforeUpdate);
        Inscrit testInscrit = inscritList.get(inscritList.size() - 1);
        assertThat(testInscrit.getDateInscrit()).isEqualTo(UPDATED_DATE_INSCRIT);
    }

    @Test
    @Transactional
    public void updateNonExistingInscrit() throws Exception {
        int databaseSizeBeforeUpdate = inscritRepository.findAll().size();

        // Create the Inscrit

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInscritMockMvc.perform(put("/api/inscrits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscrit)))
            .andExpect(status().isCreated());

        // Validate the Inscrit in the database
        List<Inscrit> inscritList = inscritRepository.findAll();
        assertThat(inscritList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInscrit() throws Exception {
        // Initialize the database
        inscritRepository.saveAndFlush(inscrit);
        int databaseSizeBeforeDelete = inscritRepository.findAll().size();

        // Get the inscrit
        restInscritMockMvc.perform(delete("/api/inscrits/{id}", inscrit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Inscrit> inscritList = inscritRepository.findAll();
        assertThat(inscritList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Inscrit.class);
        Inscrit inscrit1 = new Inscrit();
        inscrit1.setId(1L);
        Inscrit inscrit2 = new Inscrit();
        inscrit2.setId(inscrit1.getId());
        assertThat(inscrit1).isEqualTo(inscrit2);
        inscrit2.setId(2L);
        assertThat(inscrit1).isNotEqualTo(inscrit2);
        inscrit1.setId(null);
        assertThat(inscrit1).isNotEqualTo(inscrit2);
    }
}
