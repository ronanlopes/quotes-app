import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';

import { Quote } from "../../data/quote.interface";
import { QuotesService } from "../../services/quotes";
import { QuotePage } from "../quote/quote";
import { SettingsService } from "../../services/settings";


@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})

export class FavoritesPage {

	quotes: Quote[];

	constructor (
		private quotesService: QuotesService,
		private modalCtrl: ModalController,
		private settingsService: SettingsService
	) {}

	onViewQuote(quote: Quote){
		const modal = this.modalCtrl.create(QuotePage, quote);
		modal.present();
		modal.onDidDismiss((remove: boolean) => {
			if (remove){
				this.onRemoveFromFavorites(quote);
			}
		});
	}

	ionViewWillEnter() {
		this.quotes = this.quotesService.getFavoriteQuotes();
	}

	onRemoveFromFavorites(quote: Quote){
		this.quotesService.removeQuoteFromFavorites(quote);
		this.quotes = this.quotesService.getFavoriteQuotes();
	}

	getBackground(){
		return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
	}

	isAltBackground(){
		return this.settingsService.isAltBackground();
	}

}
