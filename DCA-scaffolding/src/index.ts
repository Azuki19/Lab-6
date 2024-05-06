import styles from './index.css';
import { addSongs, getSongs } from './utils/firebaseConfig';
import { Songs } from './components/indexPadre';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.loadSongs();
		const formElement = this.shadowRoot?.querySelector('form');
		if (formElement) {
			formElement.addEventListener('submit', this.handleSubmit.bind(this));
		}
	}

	async handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const songData = {
			totle: formData.get('totle') as string,
			image: formData.get('image') as string,
			autor: formData.get('autor') as string,
			album: formData.get('album') as string,
			dateadded: formData.get('dateadded') as string,
			duration: formData.get('duration') as string,
		};
		await addSongs(songData);

		const removeElement = this.shadowRoot?.querySelector('form');
		if (removeElement) {
			removeElement.reset();
		}

		this.loadSongs();
	}

	async loadSongs() {
		const saveSongs = await getSongs();

		const container = this.shadowRoot?.querySelector('.list-songs');
		if (container) {
			container.innerHTML = '';

			saveSongs.forEach((song) => {
				const songComponent = document.createElement('songs-app') as Songs;
				songComponent.totle = song.totle;
				songComponent.image = song.image;
				songComponent.autor = song.autor;
				songComponent.album = song.album;
				songComponent.dateadded = song.dateadded;
				songComponent.duration = song.duration;
				container.appendChild(songComponent);
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<section class="app-container">
					<label class="title"><h1>MY PLAYLIST</h1></label>
					<label class = "form-create-song">
						<form id="form-song">
							<input type="text" name="totle" placeholder="Title" required>
							<input type="text" name="autor" placeholder="Author" required>
							<input type="text" name="album" placeholder="Album" required>
							<input type="text" name="dateadded" placeholder="Date Added" required>
							<input type="text" name="duration" placeholder="Duration" required>
							<input type="text" name="image" placeholder="Image" required>
							<input type="submit" id="save-song" value="Save"/>
						</form>
					</label>
					<label class="list-songs">
                    </label>
				</section>
      `;
		}
	}
}

customElements.define('app-container', AppContainer);
