package daara.kebemer.sn.web.rest;

import daara.kebemer.sn.DaaraApp;

import daara.kebemer.sn.domain.NiveauEtud;
import daara.kebemer.sn.domain.Eleve;
import daara.kebemer.sn.domain.Niveau;
import daara.kebemer.sn.repository.NiveauEtudRepository;
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
 * Test class for the NiveauEtudResource REST controller.
 *
 * @see NiveauEtudResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DaaraApp.class)
public class NiveauEtudResourceIntTest {

    private static final LocalDate DEFAULT_DATE_NIVEAU = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_NIVEAU = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private NiveauEtudRepository niveauEtudRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNiveauEtudMockMvc;

    private NiveauEtud niveauEtud;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NiveauEtudResource niveauEtudResource = new NiveauEtudResource(niveauEtudRepository);
        this.restNiveauEtudMockMvc = MockMvcBuilders.standaloneSetup(niveauEtudResource)
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
    public static NiveauEtud createEntity(EntityManager em) {
        NiveauEtud niveauEtud = new NiveauEtud()
            .dateNiveau(DEFAULT_DATE_NIVEAU);
        // Add required entity
        Eleve etudiant = EleveResourceIntTest.createEntity(em);
        em.persist(etudiant);
        em.flush();
        niveauEtud.setEtudiant(etudiant);
        // Add required entity
        Niveau niveau = NiveauResourceIntTest.createEntity(em);
        em.persist(niveau);
        em.flush();
        niveauEtud.setNiveau(niveau);
        return niveauEtud;
    }

    @Before
    public void initTest() {
        niveauEtud = createEntity(em);
    }

    @Test
    @Transactional
    public void createNiveauEtud() throws Exception {
        int databaseSizeBeforeCreate = niveauEtudRepository.findAll().size();

        // Create the NiveauEtud
        restNiveauEtudMockMvc.perform(post("/api/niveau-etuds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(niveauEtud)))
            .andExpect(status().isCreated());

        // Validate the NiveauEtud in the database
        List<NiveauEtud> niveauEtudList = niveauEtudRepository.findAll();
        assertThat(niveauEtudList).hasSize(databaseSizeBeforeCreate + 1);
        NiveauEtud testNiveauEtud = niveauEtudList.get(niveauEtudList.size() - 1);
        assertThat(testNiveauEtud.getDateNiveau()).isEqualTo(DEFAULT_DATE_NIVEAU);
    }

    @Test
    @Transactional
    public void createNiveauEtudWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = niveauEtudRepository.findAll().size();

        // Create the NiveauEtud with an existing ID
        niveauEtud.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNiveauEtudMockMvc.perform(post("/api/niveau-etuds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(niveauEtud)))
            .andExpect(status().isBadRequest());

        // Validate the NiveauEtud in the database
        List<NiveauEtud> niveauEtudList = niveauEtudRepository.findAll();
        assertThat(niveauEtudList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateNiveauIsRequired() throws Exception {
        int databaseSizeBeforeTest = niveauEtudRepository.findAll().size();
        // set the field null
        niveauEtud.setDateNiveau(null);

        // Create the NiveauEtud, which fails.

        restNiveauEtudMockMvc.perform(post("/api/niveau-etuds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(niveauEtud)))
            .andExpect(status().isBadRequest());

        List<NiveauEtud> niveauEtudList = niveauEtudRepository.findAll();
        assertThat(niveauEtudList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNiveauEtuds() throws Exception {
        // Initialize the database
        niveauEtudRepository.saveAndFlush(niveauEtud);

        // Get all the niveauEtudList
        restNiveauEtudMockMvc.perform(get("/api/niveau-etuds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(niveauEtud.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateNiveau").value(hasItem(DEFAULT_DATE_NIVEAU.toString())));
    }

    @Test
    @Transactional
    public void getNiveauEtud() throws Exception {
        // Initialize the database
        niveauEtudRepository.saveAndFlush(niveauEtud);

        // Get the niveauEtud
        restNiveauEtudMockMvc.perform(get("/api/niveau-etuds/{id}", niveauEtud.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(niveauEtud.getId().intValue()))
            .andExpect(jsonPath("$.dateNiveau").value(DEFAULT_DATE_NIVEAU.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNiveauEtud() throws Exception {
        // Get the niveauEtud
        restNiveauEtudMockMvc.perform(get("/api/niveau-etuds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNiveauEtud() throws Exception {
        // Initialize the database
        niveauEtudRepository.saveAndFlush(niveauEtud);
        int databaseSizeBeforeUpdate = niveauEtudRepository.findAll().size();

        // Update the niveauEtud
        NiveauEtud updatedNiveauEtud = niveauEtudRepository.findOne(niveauEtud.getId());
        // Disconnect from session so that the updates on updatedNiveauEtud are not directly saved in db
        em.detach(updatedNiveauEtud);
        updatedNiveauEtud
            .dateNiveau(UPDATED_DATE_NIVEAU);

        restNiveauEtudMockMvc.perform(put("/api/niveau-etuds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNiveauEtud)))
            .andExpect(status().isOk());

        // Validate the NiveauEtud in the database
        List<NiveauEtud> niveauEtudList = niveauEtudRepository.findAll();
        assertThat(niveauEtudList).hasSize(databaseSizeBeforeUpdate);
        NiveauEtud testNiveauEtud = niveauEtudList.get(niveauEtudList.size() - 1);
        assertThat(testNiveauEtud.getDateNiveau()).isEqualTo(UPDATED_DATE_NIVEAU);
    }

    @Test
    @Transactional
    public void updateNonExistingNiveauEtud() throws Exception {
        int databaseSizeBeforeUpdate = niveauEtudRepository.findAll().size();

        // Create the NiveauEtud

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNiveauEtudMockMvc.perform(put("/api/niveau-etuds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(niveauEtud)))
            .andExpect(status().isCreated());

        // Validate the NiveauEtud in the database
        List<NiveauEtud> niveauEtudList = niveauEtudRepository.findAll();
        assertThat(niveauEtudList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNiveauEtud() throws Exception {
        // Initialize the database
        niveauEtudRepository.saveAndFlush(niveauEtud);
        int databaseSizeBeforeDelete = niveauEtudRepository.findAll().size();

        // Get the niveauEtud
        restNiveauEtudMockMvc.perform(delete("/api/niveau-etuds/{id}", niveauEtud.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NiveauEtud> niveauEtudList = niveauEtudRepository.findAll();
        assertThat(niveauEtudList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NiveauEtud.class);
        NiveauEtud niveauEtud1 = new NiveauEtud();
        niveauEtud1.setId(1L);
        NiveauEtud niveauEtud2 = new NiveauEtud();
        niveauEtud2.setId(niveauEtud1.getId());
        assertThat(niveauEtud1).isEqualTo(niveauEtud2);
        niveauEtud2.setId(2L);
        assertThat(niveauEtud1).isNotEqualTo(niveauEtud2);
        niveauEtud1.setId(null);
        assertThat(niveauEtud1).isNotEqualTo(niveauEtud2);
    }
}
