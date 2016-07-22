if (document.registerElement) {

	var proto = Object.create(HTMLElement.prototype, {

		createdCallback: {
			value:
			function() {
				this.player = null;
			},
			enumerable: true
		},

		attachedCallback: {
			/**
			* Lifecycle callback that is invoked when this element is added to the
			* DOM.
			*/
			value: function() {
				this.injectPlayer();
			},
			enumerable: true
		},

		attributeChangedCallback: {
			/**
			* Lifecycle callback that is invoked when an attribute is changed.
			* @param {string} attributeName Name of the attribute being changed.
			*/
			value: function(attributeName) {
				if (!this.player) {
					// It is possible that the attribute is set before before the
					// component is added to the DOM.
					return;
				}
				switch (attributeName) {
					case 'publisherId':
					case 'videoId':
						this.injectPlayer();
						break;
				}
			},
			enumerable: true
		},

		injectPlayer: {
			value: function() {
				var publisherId = this.getAttribute('publisherId'),
					videoId = this.getAttribute('videoId');
				if (publisherId && videoId) {
					if (!this.player) {
						this.player = document.createElement('div');
						this.player.style.background = '#000';
						this.appendChild(this.player);
					}

					AdEngine_adType = 'forced_success';
					top.loadCustomAd && top.loadCustomAd({
						type: 'playwire',
						publisherId: publisherId,
						videoId: videoId,
						container: this.player
					});
				}
			}
		}
	});

	document.registerElement('wikia-playwire', {prototype: proto});
}