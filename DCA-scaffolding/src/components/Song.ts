import styles from './Song.css';

export enum SongsAttribute {
	'image' = 'image',
	'totle' = 'totle',
	'autor' = 'autor',
	'album' = 'album',
	'dateadded' = 'dateadded',
	'duration' = 'duration',
}

export default class Songs extends HTMLElement {
	image?: string;
	totle?: string;
	autor?: string;
	album?: string;
	dateadded?: string;
	duration?: string;

	static get observedAttributes() {
		const attrs: Record<SongsAttribute, null> = {
			image: null,
			totle: null,
			autor: null,
			album: null,
			dateadded: null,
			duration: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propname: SongsAttribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propname) {
			default:
				this[propname] = newValue;
				break;
		}
	}
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `<section>
  <image
   src='${this.image}'></image>
  <b></b><p>${this.totle}</p>
<p>${this.autor}</p>
<p>Album:${this.album}</p>
<p>Date added: ${this.dateadded}</p>
<p>duration:${this.duration}</p>
  </section>
`;
		}
	}
}

customElements.define('songs-app', Songs);
