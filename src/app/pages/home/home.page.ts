import { Component, OnInit } from '@angular/core';
import { TaskService } from '@task/services/task/task.service';
import { Task } from '@entities/task.entity';

@Component({

	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: false,

}) export class HomePage implements OnInit{

	public constructor(private task: TaskService) {}

	public ngOnInit(): void {

		this.task.findAll().subscribe({

			next: (tasks) => console.log(tasks),
			error: (e) => console.error('Error:', e)

		});/**/

	}

}
