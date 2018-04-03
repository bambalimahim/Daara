package daara.kebemer.sn.web.rest;

import daara.kebemer.sn.DaaraApp;

import daara.kebemer.sn.domain.Maitre;
import daara.kebemer.sn.domain.User;
import daara.kebemer.sn.repository.MaitreRepository;
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
import java.util.List;

import static daara.kebemer.sn.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MaitreResource REST controller.
 *
 * @see MaitreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DaaraApp.class)
public class MaitreResourceIntTest {

    private static final String DEFAULT_MATRICULE = "AAAAAAAAAA";
    private static final String UPDATED_MATRICULE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    @Autowired
    private MaitreRepository maitreRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMaitreMockMvc;

    private Maitre maitre;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaitreResource maitreResource = new MaitreResource(maitreRepository);
        this.restMaitreMockMvc = MockMvcBuilders.standaloneSetup(maitreResource)
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
    public static Maitre createEntity(EntityManager em) {
        Maitre maitre = new Maitre()
            .matricule(DEFAULT_MATRICULE)
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .telephone(DEFAULT_TELEPHONE)
            .adresse(DEFAULT_ADRESSE);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        maitre.setUser(user);
        return maitre;
    }

    @Before
    public void initTest() {
        maitre = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaitre() throws Exception {
        int databaseSizeBeforeCreate = maitreRepository.findAll().size();

        // Create the Maitre
        restMaitreMockMvc.perform(post("/api/maitres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maitre)))
            .andExpect(status().isCreated());

        // Validate the Maitre in the database
        List<Maitre> maitreList = maitreRepository.findAll();
        assertThat(maitreList).hasSize(databaseSizeBeforeCreate + 1);
        Maitre testMaitre = maitreList.get(maitreList.size() - 1);
        assertThat(testMaitre.getMatricule()).isEqualTo(DEFAULT_MATRICULE);
        assertThat(testMaitre.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testMaitre.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testMaitre.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testMaitre.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
    }

    @Test
    @Transactional
    public void createMaitreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = maitreRepository.findAll().size();

        // Create the Maitre with an existing ID
        maitre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaitreMockMvc.perform(post("/api/maitres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maitre)))
            .andExpect(status().isBadRequest());

        // Validate the Maitre in the database
        List<Maitre> maitreList = maitreRepository.findAll();
        assertThat(maitreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkMatriculeIsRequired() throws Exception {
        int databaseSizeBeforeTest = maitreRepository.findAll().size();
        // set the field null
        maitre.setMatricule(null);

        // Create the Maitre, which fails.

        restMaitreMockMvc.perform(post("/api/maitres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maitre)))
            .andExpect(status().isBadRequest());

        List<Maitre> maitreList = maitreRepository.findAll();
        assertThat(maitreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = maitreRepository.findAll().size();
        // set the field null
        maitre.setNom(null);

        // Create the Maitre, which fails.

        restMaitreMockMvc.perform(post("/api/maitres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maitre)))
            .andExpect(status().isBadRequest());

        List<Maitre> maitreList = maitreRepository.findAll();
        assertThat(maitreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = maitreRepository.findAll().size();
        // set the field null
        maitre.setPrenom(null);

        // Create the Maitre, which fails.

        restMaitreMockMvc.perform(post("/api/maitres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maitre)))
            .andExpect(status().isBadRequest());

        List<Maitre> maitreList = maitreRepository.findAll();
        assertThat(maitreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = maitreRepository.findAll().size();
        // set the field null
        maitre.setTelephone(null);

        // Create the Maitre, which fails.

        restMaitreMockMvc.perform(post("/api/maitres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maitre)))
            .andExpect(status().isBadRequest());

        List<Maitre> maitreList = maitreRepository.findAll();
        assertThat(maitreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = maitreRepository.findAll().size();
        // set the field null
        maitre.setAdresse(null);

        // Create the Maitre, which fails.

        restMaitreMockMvc.perform(post("/api/maitres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maitre)))
            .andExpect(status().isBadRequest());

        List<Maitre> maitreList = maitreRepository.findAll();
        assertThat(maitreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMaitres() throws Exception {
        // Initialize the database
        maitreRepository.saveAndFlush(maitre);

        // Get all the maitreList
        restMaitreMockMvc.perform(get("/api/maitres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(maitre.getId().intValue())))
            .andExpect(jsonPath("$.[*].matricule").value(hasItem(DEFAULT_MATRICULE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())));
    }

    @Test
    @Transactional
    public void getMaitre() throws Exception {
        // Initialize the database
        maitreRepository.saveAndFlush(maitre);

        // Get the maitre
        restMaitreMockMvc.perform(get("/api/maitres/{id}", maitre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(maitre.getId().intValue()))
            .andExpect(jsonPath("$.matricule").value(DEFAULT_MATRICULE.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMaitre() throws Exception {
        // Get the maitre
        restMaitreMockMvc.perform(get("/api/maitres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaitre() throws Exception {
        // Initialize the database
        maitreRepository.saveAndFlush(maitre);
        int databaseSizeBeforeUpdate = maitreRepository.findAll().size();

        // Update the maitre
        Maitre updatedMaitre = maitreRepository.findOne(maitre.getId());
        // Disconnect from session so that the updates on updatedMaitre are not directly saved in db
        em.detach(updatedMaitre);
        updatedMaitre
            .matricule(UPDATED_MATRICULE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .telephone(UPDATED_TELEPHONE)
            .adresse(UPDATED_ADRESSE);

        restMaitreMockMvc.perform(put("/api/maitres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMaitre)))
            .andExpect(status().isOk());

        // Validate the Maitre in the database
        List<Maitre> maitreList = maitreRepository.findAll();
        assertThat(maitreList).hasSize(databaseSizeBeforeUpdate);
        Maitre testMaitre = maitreList.get(maitreList.size() - 1);
        assertThat(testMaitre.getMatricule()).isEqualTo(UPDATED_MATRICULE);
        assertThat(testMaitre.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMaitre.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testMaitre.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testMaitre.getAdresse()).isEqualTo(UPDATED_ADRESSE);
    }

    @Test
    @Transactional
    public void updateNonExistingMaitre() throws Exception {
        int databaseSizeBeforeUpdate = maitreRepository.findAll().size();

        // Create the Maitre

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMaitreMockMvc.perform(put("/api/maitres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maitre)))
            .andExpect(status().isCreated());

        // Validate the Maitre in the database
        List<Maitre> maitreList = maitreRepository.findAll();
        assertThat(maitreList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMaitre() throws Exception {
        // Initialize the database
        maitreRepository.saveAndFlush(maitre);
        int databaseSizeBeforeDelete = maitreRepository.findAll().size();

        // Get the maitre
        restMaitreMockMvc.perform(delete("/api/maitres/{id}", maitre.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Maitre> maitreList = maitreRepository.findAll();
        assertThat(maitreList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Maitre.class);
        Maitre maitre1 = new Maitre();
        maitre1.setId(1L);
        Maitre maitre2 = new Maitre();
        maitre2.setId(maitre1.getId());
        assertThat(maitre1).isEqualTo(maitre2);
        maitre2.setId(2L);
        assertThat(maitre1).isNotEqualTo(maitre2);
        maitre1.setId(null);
        assertThat(maitre1).isNotEqualTo(maitre2);
    }
}
