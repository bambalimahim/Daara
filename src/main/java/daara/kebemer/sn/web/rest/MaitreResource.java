package daara.kebemer.sn.web.rest;

import com.codahale.metrics.annotation.Timed;
import daara.kebemer.sn.domain.Maitre;

import daara.kebemer.sn.repository.MaitreRepository;
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
 * REST controller for managing Maitre.
 */
@RestController
@RequestMapping("/api")
public class MaitreResource {

    private final Logger log = LoggerFactory.getLogger(MaitreResource.class);

    private static final String ENTITY_NAME = "maitre";

    private final MaitreRepository maitreRepository;

    public MaitreResource(MaitreRepository maitreRepository) {
        this.maitreRepository = maitreRepository;
    }

    /**
     * POST  /maitres : Create a new maitre.
     *
     * @param maitre the maitre to create
     * @return the ResponseEntity with status 201 (Created) and with body the new maitre, or with status 400 (Bad Request) if the maitre has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/maitres")
    @Timed
    public ResponseEntity<Maitre> createMaitre(@Valid @RequestBody Maitre maitre) throws URISyntaxException {
        log.debug("REST request to save Maitre : {}", maitre);
        if (maitre.getId() != null) {
            throw new BadRequestAlertException("A new maitre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Maitre result = maitreRepository.save(maitre);
        return ResponseEntity.created(new URI("/api/maitres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /maitres : Updates an existing maitre.
     *
     * @param maitre the maitre to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated maitre,
     * or with status 400 (Bad Request) if the maitre is not valid,
     * or with status 500 (Internal Server Error) if the maitre couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/maitres")
    @Timed
    public ResponseEntity<Maitre> updateMaitre(@Valid @RequestBody Maitre maitre) throws URISyntaxException {
        log.debug("REST request to update Maitre : {}", maitre);
        if (maitre.getId() == null) {
            return createMaitre(maitre);
        }
        Maitre result = maitreRepository.save(maitre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, maitre.getId().toString()))
            .body(result);
    }

    /**
     * GET  /maitres : get all the maitres.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of maitres in body
     */
    @GetMapping("/maitres")
    @Timed
    public List<Maitre> getAllMaitres() {
        log.debug("REST request to get all Maitres");
        return maitreRepository.findAll();
        }

    /**
     * GET  /maitres/:id : get the "id" maitre.
     *
     * @param id the id of the maitre to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the maitre, or with status 404 (Not Found)
     */
    @GetMapping("/maitres/{id}")
    @Timed
    public ResponseEntity<Maitre> getMaitre(@PathVariable Long id) {
        log.debug("REST request to get Maitre : {}", id);
        Maitre maitre = maitreRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(maitre));
    }

    /**
     * DELETE  /maitres/:id : delete the "id" maitre.
     *
     * @param id the id of the maitre to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/maitres/{id}")
    @Timed
    public ResponseEntity<Void> deleteMaitre(@PathVariable Long id) {
        log.debug("REST request to delete Maitre : {}", id);
        maitreRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
