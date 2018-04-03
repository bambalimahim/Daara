package daara.kebemer.sn.web.rest;

import daara.kebemer.sn.DaaraApp;

import daara.kebemer.sn.domain.Classe;
import daara.kebemer.sn.domain.Maitre;
import daara.kebemer.sn.repository.ClasseRepository;
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
 * Test class for the ClasseResource REST controller.
 *
 * @see ClasseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DaaraApp.class)
public class ClasseResourceIntTest {

    private static final String DEFAULT_CODE_CLASSE = "AAAAAAAAAA";
    private static final String UPDATED_CODE_CLASSE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM_CLASSE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_CLASSE = "BBBBBBBBBB";

    @Autowired
    private ClasseRepository classeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClasseMockMvc;

    private Classe classe;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClasseResource classeResource = new ClasseResource(classeRepository);
        this.restClasseMockMvc = MockMvcBuilders.standaloneSetup(classeResource)
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
    public static Classe createEntity(EntityManager em) {
        Classe classe = new Classe()
            .codeClasse(DEFAULT_CODE_CLASSE)
            .nomClasse(DEFAULT_NOM_CLASSE);
        // Add required entity
        Maitre maitre = MaitreResourceIntTest.createEntity(em);
        em.persist(maitre);
        em.flush();
        classe.setMaitre(maitre);
        return classe;
    }

    @Before
    public void initTest() {
        classe = createEntity(em);
    }

    @Test
    @Transactional
    public void createClasse() throws Exception {
        int databaseSizeBeforeCreate = classeRepository.findAll().size();

        // Create the Classe
        restClasseMockMvc.perform(post("/api/classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classe)))
            .andExpect(status().isCreated());

        // Validate the Classe in the database
        List<Classe> classeList = classeRepository.findAll();
        assertThat(classeList).hasSize(databaseSizeBeforeCreate + 1);
        Classe testClasse = classeList.get(classeList.size() - 1);
        assertThat(testClasse.getCodeClasse()).isEqualTo(DEFAULT_CODE_CLASSE);
        assertThat(testClasse.getNomClasse()).isEqualTo(DEFAULT_NOM_CLASSE);
    }

    @Test
    @Transactional
    public void createClasseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = classeRepository.findAll().size();

        // Create the Classe with an existing ID
        classe.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClasseMockMvc.perform(post("/api/classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classe)))
            .andExpect(status().isBadRequest());

        // Validate the Classe in the database
        List<Classe> classeList = classeRepository.findAll();
        assertThat(classeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomClasseIsRequired() throws Exception {
        int databaseSizeBeforeTest = classeRepository.findAll().size();
        // set the field null
        classe.setNomClasse(null);

        // Create the Classe, which fails.

        restClasseMockMvc.perform(post("/api/classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classe)))
            .andExpect(status().isBadRequest());

        List<Classe> classeList = classeRepository.findAll();
        assertThat(classeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllClasses() throws Exception {
        // Initialize the database
        classeRepository.saveAndFlush(classe);

        // Get all the classeList
        restClasseMockMvc.perform(get("/api/classes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(classe.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeClasse").value(hasItem(DEFAULT_CODE_CLASSE.toString())))
            .andExpect(jsonPath("$.[*].nomClasse").value(hasItem(DEFAULT_NOM_CLASSE.toString())));
    }

    @Test
    @Transactional
    public void getClasse() throws Exception {
        // Initialize the database
        classeRepository.saveAndFlush(classe);

        // Get the classe
        restClasseMockMvc.perform(get("/api/classes/{id}", classe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(classe.getId().intValue()))
            .andExpect(jsonPath("$.codeClasse").value(DEFAULT_CODE_CLASSE.toString()))
            .andExpect(jsonPath("$.nomClasse").value(DEFAULT_NOM_CLASSE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClasse() throws Exception {
        // Get the classe
        restClasseMockMvc.perform(get("/api/classes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClasse() throws Exception {
        // Initialize the database
        classeRepository.saveAndFlush(classe);
        int databaseSizeBeforeUpdate = classeRepository.findAll().size();

        // Update the classe
        Classe updatedClasse = classeRepository.findOne(classe.getId());
        // Disconnect from session so that the updates on updatedClasse are not directly saved in db
        em.detach(updatedClasse);
        updatedClasse
            .codeClasse(UPDATED_CODE_CLASSE)
            .nomClasse(UPDATED_NOM_CLASSE);

        restClasseMockMvc.perform(put("/api/classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedClasse)))
            .andExpect(status().isOk());

        // Validate the Classe in the database
        List<Classe> classeList = classeRepository.findAll();
        assertThat(classeList).hasSize(databaseSizeBeforeUpdate);
        Classe testClasse = classeList.get(classeList.size() - 1);
        assertThat(testClasse.getCodeClasse()).isEqualTo(UPDATED_CODE_CLASSE);
        assertThat(testClasse.getNomClasse()).isEqualTo(UPDATED_NOM_CLASSE);
    }

    @Test
    @Transactional
    public void updateNonExistingClasse() throws Exception {
        int databaseSizeBeforeUpdate = classeRepository.findAll().size();

        // Create the Classe

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClasseMockMvc.perform(put("/api/classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classe)))
            .andExpect(status().isCreated());

        // Validate the Classe in the database
        List<Classe> classeList = classeRepository.findAll();
        assertThat(classeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteClasse() throws Exception {
        // Initialize the database
        classeRepository.saveAndFlush(classe);
        int databaseSizeBeforeDelete = classeRepository.findAll().size();

        // Get the classe
        restClasseMockMvc.perform(delete("/api/classes/{id}", classe.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Classe> classeList = classeRepository.findAll();
        assertThat(classeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Classe.class);
        Classe classe1 = new Classe();
        classe1.setId(1L);
        Classe classe2 = new Classe();
        classe2.setId(classe1.getId());
        assertThat(classe1).isEqualTo(classe2);
        classe2.setId(2L);
        assertThat(classe1).isNotEqualTo(classe2);
        classe1.setId(null);
        assertThat(classe1).isNotEqualTo(classe2);
    }
}
