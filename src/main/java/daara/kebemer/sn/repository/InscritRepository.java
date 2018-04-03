package daara.kebemer.sn.repository;

import daara.kebemer.sn.domain.Inscrit;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Inscrit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InscritRepository extends JpaRepository<Inscrit, Long> {

}
