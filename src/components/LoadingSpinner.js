// Importation des librairies nécéssaire
import {
  defineComponent,
  h,
  ref,
  watch,
  onUnmounted
} from 'vue'

import '../../css/styles.css'

// Composant de chargement indépendant et réutilisable.
export default defineComponent({
  name: 'LoadingSpinner',

  // Propriétés que les autres composants pourront transmettre.
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      default: 'Chargement en cours...'
    },
    delay: {
      type: Number,
      default: 300
    }
  },

  setup(props) {
    // Contrôle la visibilité du spinner.
    const visible = ref(false)

    // Timer permettant de retarder l'affichage.
    let timer = null

    // Surveille les changements de l'état de chargement.
    watch(
      () => props.loading,
      (isLoading) => {
        // Annule un éventuel timer précédent.
        clearTimeout(timer)
        timer = null

        if (isLoading) {
          // Attend avant d'afficher le spinner.
          timer = setTimeout(() => {
            visible.value = true
            timer = null
          }, Math.max(0, props.delay))
        } else {
          // Masque immédiatement le spinner.
          visible.value = false
        }
      },
      { immediate: true }
    )

    // Nettoyage lorsque le composant est détruit.
    onUnmounted(() => {
      clearTimeout(timer)
    })

    // Fonction de rendu du composant.
    return () => {
      // Aucun élément affiché si le spinner est invisible.
      if (!visible.value) return null

      return h('div', {
        class: 'loading-container',
        role: 'status',
        'aria-live': 'polite'
      }, [
        // Cercle animé.
        h('div', {
          class: 'loading-spinner',
          'aria-hidden': 'true'
        }),

        // Message personnalisable.
        h('p', {
          class: 'loading-message'
        }, props.message)
      ])
    }
  }
})
