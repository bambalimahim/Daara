package daara.kebemer.sn.repository;

import daara.kebemer.sn.domain.NiveauEtud;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the NiveauEtud entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NiveauEtudRepository extends JpaRepository<NiveauEtud, Long> {

}
