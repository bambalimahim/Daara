package daara.kebemer.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Niveau.
 */
@Entity
@Table(name = "niveau")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Niveau implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code_niveau")
    private String codeNiveau;

    @NotNull
    @Column(name = "niveau", nullable = false)
    private String niveau;

    @OneToMany(mappedBy = "niveau")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<NiveauEtud> niveauEtuds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeNiveau() {
        return codeNiveau;
    }

    public Niveau codeNiveau(String codeNiveau) {
        this.codeNiveau = codeNiveau;
        return this;
    }

    public void setCodeNiveau(String codeNiveau) {
        this.codeNiveau = codeNiveau;
    }

    public String getNiveau() {
        return niveau;
    }

    public Niveau niveau(String niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public Set<NiveauEtud> getNiveauEtuds() {
        return niveauEtuds;
    }

    public Niveau niveauEtuds(Set<NiveauEtud> niveauEtuds) {
        this.niveauEtuds = niveauEtuds;
        return this;
    }

    public Niveau addNiveauEtud(NiveauEtud niveauEtud) {
        this.niveauEtuds.add(niveauEtud);
        niveauEtud.setNiveau(this);
        return this;
    }

    public Niveau removeNiveauEtud(NiveauEtud niveauEtud) {
        this.niveauEtuds.remove(niveauEtud);
        niveauEtud.setNiveau(null);
        return this;
    }

    public void setNiveauEtuds(Set<NiveauEtud> niveauEtuds) {
        this.niveauEtuds = niveauEtuds;
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
        Niveau niveau = (Niveau) o;
        if (niveau.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), niveau.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Niveau{" +
            "id=" + getId() +
            ", codeNiveau='" + getCodeNiveau() + "'" +
            ", niveau='" + getNiveau() + "'" +
            "}";
    }
}
