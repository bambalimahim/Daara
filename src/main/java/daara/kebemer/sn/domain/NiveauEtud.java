package daara.kebemer.sn.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A NiveauEtud.
 */
@Entity
@Table(name = "niveau_etud")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class NiveauEtud implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date_niveau", nullable = false)
    private LocalDate dateNiveau;

    @ManyToOne(optional = false)
    @NotNull
    private Eleve etudiant;

    @ManyToOne(optional = false)
    @NotNull
    private Niveau niveau;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateNiveau() {
        return dateNiveau;
    }

    public NiveauEtud dateNiveau(LocalDate dateNiveau) {
        this.dateNiveau = dateNiveau;
        return this;
    }

    public void setDateNiveau(LocalDate dateNiveau) {
        this.dateNiveau = dateNiveau;
    }

    public Eleve getEtudiant() {
        return etudiant;
    }

    public NiveauEtud etudiant(Eleve eleve) {
        this.etudiant = eleve;
        return this;
    }

    public void setEtudiant(Eleve eleve) {
        this.etudiant = eleve;
    }

    public Niveau getNiveau() {
        return niveau;
    }

    public NiveauEtud niveau(Niveau niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(Niveau niveau) {
        this.niveau = niveau;
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
        NiveauEtud niveauEtud = (NiveauEtud) o;
        if (niveauEtud.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), niveauEtud.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NiveauEtud{" +
            "id=" + getId() +
            ", dateNiveau='" + getDateNiveau() + "'" +
            "}";
    }
}
