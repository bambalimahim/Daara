package daara.kebemer.sn.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Inscrit.
 */
@Entity
@Table(name = "inscrit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Inscrit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date_inscrit", nullable = false)
    private LocalDate dateInscrit;

    @ManyToOne(optional = false)
    @NotNull
    private Eleve etudiant;

    @ManyToOne(optional = false)
    @NotNull
    private Classe niveau;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateInscrit() {
        return dateInscrit;
    }

    public Inscrit dateInscrit(LocalDate dateInscrit) {
        this.dateInscrit = dateInscrit;
        return this;
    }

    public void setDateInscrit(LocalDate dateInscrit) {
        this.dateInscrit = dateInscrit;
    }

    public Eleve getEtudiant() {
        return etudiant;
    }

    public Inscrit etudiant(Eleve eleve) {
        this.etudiant = eleve;
        return this;
    }

    public void setEtudiant(Eleve eleve) {
        this.etudiant = eleve;
    }

    public Classe getNiveau() {
        return niveau;
    }

    public Inscrit niveau(Classe classe) {
        this.niveau = classe;
        return this;
    }

    public void setNiveau(Classe classe) {
        this.niveau = classe;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Inscrit inscrit = (Inscrit) o;
        if (inscrit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inscrit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Inscrit{" +
            "id=" + getId() +
            ", dateInscrit='" + getDateInscrit() + "'" +
            "}";
    }
}
