import { Component, OnInit, Input } from '@angular/core';
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

	public constructor(private router: Router) {}

	public ngOnInit(): void {}

	public navigateToDetail(): void {

		this.router.navigate(['/task', this.task.id]);

	}

}
