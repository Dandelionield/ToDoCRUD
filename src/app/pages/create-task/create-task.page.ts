import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Task } from '@entities/task.entity';
import { TaskService } from '@task/services/task/task.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({

	selector: 'app-create-task',
	templateUrl: './create-task.page.html',
	styleUrls: ['./create-task.page.scss'],
	standalone: false

}) export class CreateTaskPage implements OnInit {

	public taskForm: FormGroup;

	public constructor(private fb: FormBuilder, private router: Router, private store: TaskService) {

		this.taskForm = this.fb.group({

			title: ['', [Validators.required, Validators.maxLength(50)]],
			description: ['', Validators.maxLength(200)],
			date: [new Date().toISOString(), Validators.required],
			done: [false]

		});

	}

	public ngOnInit(): void{}

	get formattedDate(): string {

		return formatDate(

			this.taskForm.get('date')?.value, 
			'dd/MM/yyyy', 
			'es-ES'

		);
	}

	public async insert(): Promise<void> {

		if (this.taskForm.valid){

			try {

				const newTask: Task = {

					...this.taskForm.value,
					date: Timestamp.fromDate(new Date(

						this.taskForm.get('date')?.value

					))

				};
				
				await this.store.insert(newTask);

				this.router.navigate(['/home']);

			}catch(e){

				console.error('Error creating task:', e);

			}

		}

	}

	public cancel(): void {

		this.router.navigate(['/home']);

	}

}
