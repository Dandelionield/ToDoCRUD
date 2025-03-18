import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '@task/services/task/task.service';
import { Task } from '@entities/task.entity';
import { Router } from '@angular/router';

@Component({

	selector: 'app-task-card',
	templateUrl: './task-card.component.html',
	styleUrls: ['./task-card.component.scss'],
	standalone: false

}) export class TaskCardComponent implements OnInit {

	@Input({

		required: true

	}) public task!: Task;

	public constructor(private router: Router, private store: TaskService) {}

	public ngOnInit(): void {}

	public navigateToDetail(): void {

		this.router.navigate(['/task', this.task.id]);

	}

	public delete(): void {

		if (this.task.id) {

			this.store.delete(this.task.id);

		}

	}

}
