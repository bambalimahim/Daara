package daara.kebemer.sn.web.rest;

import com.codahale.metrics.annotation.Timed;
import daara.kebemer.sn.domain.Parent;

import daara.kebemer.sn.repository.ParentRepository;
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
 * REST controller for managing Parent.
 */
@RestController
@RequestMapping("/api")
public class ParentResource {

    private final Logger log = LoggerFactory.getLogger(ParentResource.class);

    private static final String ENTITY_NAME = "parent";

    private final ParentRepository parentRepository;

    public ParentResource(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    /**
     * POST  /parents : Create a new parent.
     *
     * @param parent the parent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parent, or with status 400 (Bad Request) if the parent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parents")
    @Timed
    public ResponseEntity<Parent> createParent(@Valid @RequestBody Parent parent) throws URISyntaxException {
        log.debug("REST request to save Parent : {}", parent);
        if (parent.getId() != null) {
            throw new BadRequestAlertException("A new parent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Parent result = parentRepository.save(parent);
        return ResponseEntity.created(new URI("/api/parents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parents : Updates an existing parent.
     *
     * @param parent the parent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parent,
     * or with status 400 (Bad Request) if the parent is not valid,
     * or with status 500 (Internal Server Error) if the parent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parents")
    @Timed
    public ResponseEntity<Parent> updateParent(@Valid @RequestBody Parent parent) throws URISyntaxException {
        log.debug("REST request to update Parent : {}", parent);
        if (parent.getId() == null) {
            return createParent(parent);
        }
        Parent result = parentRepository.save(parent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parents : get all the parents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parents in body
     */
    @GetMapping("/parents")
    @Timed
    public List<Parent> getAllParents() {
        log.debug("REST request to get all Parents");
        return parentRepository.findAll();
        }

    /**
     * GET  /parents/:id : get the "id" parent.
     *
     * @param id the id of the parent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parent, or with status 404 (Not Found)
     */
    @GetMapping("/parents/{id}")
    @Timed
    public ResponseEntity<Parent> getParent(@PathVariable Long id) {
        log.debug("REST request to get Parent : {}", id);
        Parent parent = parentRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(parent));
    }

    /**
     * DELETE  /parents/:id : delete the "id" parent.
     *
     * @param id the id of the parent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parents/{id}")
    @Timed
    public ResponseEntity<Void> deleteParent(@PathVariable Long id) {
        log.debug("REST request to delete Parent : {}", id);
        parentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
