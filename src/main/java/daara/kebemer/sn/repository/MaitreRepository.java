package daara.kebemer.sn.repository;

import daara.kebemer.sn.domain.Maitre;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Maitre entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaitreRepository extends JpaRepository<Maitre, Long> {

}
