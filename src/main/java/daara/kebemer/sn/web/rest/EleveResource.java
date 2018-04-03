package daara.kebemer.sn.web.rest;

import com.codahale.metrics.annotation.Timed;
import daara.kebemer.sn.domain.Eleve;

import daara.kebemer.sn.repository.EleveRepository;
import daara.kebemer.sn.web.rest.errors.BadRequestAlertException;
import daara.kebemer.sn.web.rest.util.HeaderUtil;
import daara.kebemer.sn.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Eleve.
 */
@RestController
@RequestMapping("/api")
public class EleveResource {

    private final Logger log = LoggerFactory.getLogger(EleveResource.class);

    private static final String ENTITY_NAME = "eleve";

    private final EleveRepository eleveRepository;

    public EleveResource(EleveRepository eleveRepository) {
        this.eleveRepository = eleveRepository;
    }

    /**
     * POST  /eleves : Create a new eleve.
     *
     * @param eleve the eleve to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eleve, or with status 400 (Bad Request) if the eleve has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/eleves")
    @Timed
    public ResponseEntity<Eleve> createEleve(@Valid @RequestBody Eleve eleve) throws URISyntaxException {
        log.debug("REST request to save Eleve : {}", eleve);
        if (eleve.getId() != null) {
            throw new BadRequestAlertException("A new eleve cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Eleve result = eleveRepository.save(eleve);
        return ResponseEntity.created(new URI("/api/eleves/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /eleves : Updates an existing eleve.
     *
     * @param eleve the eleve to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eleve,
     * or with status 400 (Bad Request) if the eleve is not valid,
     * or with status 500 (Internal Server Error) if the eleve couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/eleves")
    @Timed
    public ResponseEntity<Eleve> updateEleve(@Valid @RequestBody Eleve eleve) throws URISyntaxException {
        log.debug("REST request to update Eleve : {}", eleve);
        if (eleve.getId() == null) {
            return createEleve(eleve);
        }
        Eleve result = eleveRepository.save(eleve);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eleve.getId().toString()))
            .body(result);
    }

    /**
     * GET  /eleves : get all the eleves.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of eleves in body
     */
    @GetMapping("/eleves")
    @Timed
    public ResponseEntity<List<Eleve>> getAllEleves(Pageable pageable) {
        log.debug("REST request to get a page of Eleves");
        Page<Eleve> page = eleveRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/eleves");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /eleves/:id : get the "id" eleve.
     *
     * @param id the id of the eleve to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eleve, or with status 404 (Not Found)
     */
    @GetMapping("/eleves/{id}")
    @Timed
    public ResponseEntity<Eleve> getEleve(@PathVariable Long id) {
        log.debug("REST request to get Eleve : {}", id);
        Eleve eleve = eleveRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(eleve));
    }

    /**
     * DELETE  /eleves/:id : delete the "id" eleve.
     *
     * @param id the id of the eleve to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/eleves/{id}")
    @Timed
    public ResponseEntity<Void> deleteEleve(@PathVariable Long id) {
        log.debug("REST request to delete Eleve : {}", id);
        eleveRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
