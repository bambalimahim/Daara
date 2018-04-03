package daara.kebemer.sn.web.rest;

import com.codahale.metrics.annotation.Timed;
import daara.kebemer.sn.domain.NiveauEtud;

import daara.kebemer.sn.repository.NiveauEtudRepository;
import daara.kebemer.sn.web.rest.errors.BadRequestAlertException;
import daara.kebemer.sn.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing NiveauEtud.
 */
@RestController
@RequestMapping("/api")
public class NiveauEtudResource {

    private final Logger log = LoggerFactory.getLogger(NiveauEtudResource.class);

    private static final String ENTITY_NAME = "niveauEtud";

    private final NiveauEtudRepository niveauEtudRepository;

    public NiveauEtudResource(NiveauEtudRepository niveauEtudRepository) {
        this.niveauEtudRepository = niveauEtudRepository;
    }

    /**
     * POST  /niveau-etuds : Create a new niveauEtud.
     *
     * @param niveauEtud the niveauEtud to create
     * @return the ResponseEntity with status 201 (Created) and with body the new niveauEtud, or with status 400 (Bad Request) if the niveauEtud has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/niveau-etuds")
    @Timed
    public ResponseEntity<NiveauEtud> createNiveauEtud(@Valid @RequestBody NiveauEtud niveauEtud) throws URISyntaxException {
        log.debug("REST request to save NiveauEtud : {}", niveauEtud);
        if (niveauEtud.getId() != null) {
            throw new BadRequestAlertException("A new niveauEtud cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NiveauEtud result = niveauEtudRepository.save(niveauEtud);
        return ResponseEntity.created(new URI("/api/niveau-etuds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /niveau-etuds : Updates an existing niveauEtud.
     *
     * @param niveauEtud the niveauEtud to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated niveauEtud,
     * or with status 400 (Bad Request) if the niveauEtud is not valid,
     * or with status 500 (Internal Server Error) if the niveauEtud couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/niveau-etuds")
    @Timed
    public ResponseEntity<NiveauEtud> updateNiveauEtud(@Valid @RequestBody NiveauEtud niveauEtud) throws URISyntaxException {
        log.debug("REST request to update NiveauEtud : {}", niveauEtud);
        if (niveauEtud.getId() == null) {
            return createNiveauEtud(niveauEtud);
        }
        NiveauEtud result = niveauEtudRepository.save(niveauEtud);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, niveauEtud.getId().toString()))
            .body(result);
    }

    /**
     * GET  /niveau-etuds : get all the niveauEtuds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of niveauEtuds in body
     */
    @GetMapping("/niveau-etuds")
    @Timed
    public List<NiveauEtud> getAllNiveauEtuds() {
        log.debug("REST request to get all NiveauEtuds");
        return niveauEtudRepository.findAll();
        }

    /**
     * GET  /niveau-etuds/:id : get the "id" niveauEtud.
     *
     * @param id the id of the niveauEtud to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the niveauEtud, or with status 404 (Not Found)
     */
    @GetMapping("/niveau-etuds/{id}")
    @Timed
    public ResponseEntity<NiveauEtud> getNiveauEtud(@PathVariable Long id) {
        log.debug("REST request to get NiveauEtud : {}", id);
        NiveauEtud niveauEtud = niveauEtudRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(niveauEtud));
    }

    /**
     * DELETE  /niveau-etuds/:id : delete the "id" niveauEtud.
     *
     * @param id the id of the niveauEtud to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/niveau-etuds/{id}")
    @Timed
    public ResponseEntity<Void> deleteNiveauEtud(@PathVariable Long id) {
        log.debug("REST request to delete NiveauEtud : {}", id);
        niveauEtudRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
