import { Component, OnInit } from '@angular/core';
import { TaskService } from '@task/services/task/task.service';
import { Task } from '@entities/task.entity';
import { Router } from '@angular/router';

@Component({

	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: false,

}) export class HomePage implements OnInit{

	public tasks!: Array<Task>;
	public searchText: string = "";

	public constructor(private task: TaskService, private router: Router) {

		/*this.task.findByName('D').subscribe({

			next: (t) => console.log(t),
			error: (e) => console.error('Error:', e)

		});/**/

	}

	public ngOnInit(): void {

		this.findAll();

	}

	public findAll(): void {

		this.task.findAll().subscribe({

			next: (t) => this.tasks = t,
			error: (e) => console.error('Error:', e)

		});

	}

	public findByName(): void {

		if (this.searchText!==""){

			this.task.findByName(this.searchText).subscribe({

				next: (t) => this.tasks = t,
				error: (e) => console.error('Error:', e)

			});

		}else{

			this.findAll();

		}

	}

	public navigateToCreate(): void {

		this.router.navigate(['/create']);

	}

}
