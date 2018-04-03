package daara.kebemer.sn.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(daara.kebemer.sn.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Eleve.class.getName(), jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Eleve.class.getName() + ".inscrits", jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Eleve.class.getName() + ".niveauEtuds", jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Classe.class.getName(), jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Classe.class.getName() + ".inscrits", jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Inscrit.class.getName(), jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Niveau.class.getName(), jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Niveau.class.getName() + ".niveauEtuds", jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.NiveauEtud.class.getName(), jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Parent.class.getName(), jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Parent.class.getName() + ".eleves", jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Maitre.class.getName(), jcacheConfiguration);
            cm.createCache(daara.kebemer.sn.domain.Maitre.class.getName() + ".classes", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
