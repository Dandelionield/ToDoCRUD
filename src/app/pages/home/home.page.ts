import { Component, OnInit } from '@angular/core';
import { TaskService } from '@task/services/task/task.service';

@Component({

	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: false,

}) export class HomePage implements OnInit{

	public constructor(private task: TaskService) {}

	public ngOnInit(): void {

		console.log(this.task.findAll());

	}

}
