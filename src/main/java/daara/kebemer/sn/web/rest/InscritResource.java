package daara.kebemer.sn.web.rest;

import com.codahale.metrics.annotation.Timed;
import daara.kebemer.sn.domain.Inscrit;

import daara.kebemer.sn.repository.InscritRepository;
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
 * REST controller for managing Inscrit.
 */
@RestController
@RequestMapping("/api")
public class InscritResource {

    private final Logger log = LoggerFactory.getLogger(InscritResource.class);

    private static final String ENTITY_NAME = "inscrit";

    private final InscritRepository inscritRepository;

    public InscritResource(InscritRepository inscritRepository) {
        this.inscritRepository = inscritRepository;
    }

    /**
     * POST  /inscrits : Create a new inscrit.
     *
     * @param inscrit the inscrit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new inscrit, or with status 400 (Bad Request) if the inscrit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/inscrits")
    @Timed
    public ResponseEntity<Inscrit> createInscrit(@Valid @RequestBody Inscrit inscrit) throws URISyntaxException {
        log.debug("REST request to save Inscrit : {}", inscrit);
        if (inscrit.getId() != null) {
            throw new BadRequestAlertException("A new inscrit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Inscrit result = inscritRepository.save(inscrit);
        return ResponseEntity.created(new URI("/api/inscrits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /inscrits : Updates an existing inscrit.
     *
     * @param inscrit the inscrit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated inscrit,
     * or with status 400 (Bad Request) if the inscrit is not valid,
     * or with status 500 (Internal Server Error) if the inscrit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/inscrits")
    @Timed
    public ResponseEntity<Inscrit> updateInscrit(@Valid @RequestBody Inscrit inscrit) throws URISyntaxException {
        log.debug("REST request to update Inscrit : {}", inscrit);
        if (inscrit.getId() == null) {
            return createInscrit(inscrit);
        }
        Inscrit result = inscritRepository.save(inscrit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, inscrit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /inscrits : get all the inscrits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of inscrits in body
     */
    @GetMapping("/inscrits")
    @Timed
    public List<Inscrit> getAllInscrits() {
        log.debug("REST request to get all Inscrits");
        return inscritRepository.findAll();
        }

    /**
     * GET  /inscrits/:id : get the "id" inscrit.
     *
     * @param id the id of the inscrit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the inscrit, or with status 404 (Not Found)
     */
    @GetMapping("/inscrits/{id}")
    @Timed
    public ResponseEntity<Inscrit> getInscrit(@PathVariable Long id) {
        log.debug("REST request to get Inscrit : {}", id);
        Inscrit inscrit = inscritRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(inscrit));
    }

    /**
     * DELETE  /inscrits/:id : delete the "id" inscrit.
     *
     * @param id the id of the inscrit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/inscrits/{id}")
    @Timed
    public ResponseEntity<Void> deleteInscrit(@PathVariable Long id) {
        log.debug("REST request to delete Inscrit : {}", id);
        inscritRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
