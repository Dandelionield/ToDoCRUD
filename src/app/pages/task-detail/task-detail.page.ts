import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { TaskService } from '@task/services/task/task.service';
import { Task } from '@entities/task.entity';
import { Timestamp } from '@angular/fire/firestore';
import { formatDate } from '@angular/common';

@Component({

	selector: 'app-task-detail',
	templateUrl: './task-detail.page.html',
	styleUrls: ['./task-detail.page.scss'],
	standalone: false

}) export class TaskDetailPage implements OnInit{

	public task!: Task;
	public taskForm!: FormGroup;
	public editingField!: boolean | null;

	public constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private store: TaskService) {

		this.taskForm = this.fb.group({

			title: ['', [Validators.required, Validators.maxLength(50)]],
			description: ['', Validators.maxLength(200)],
			date: [new Date().toISOString(), Validators.required],
			done: [false]

		});

	}

	public ngOnInit(): void {

		const id: string = this.route.snapshot.paramMap.get('id') as string;

		if (id){

			this.store.find(id).subscribe({

				next: (t) => {

					if (this.task==undefined) {

						this.task = t as Task;

						this.taskForm.patchValue({

							...this.task,
							date: this.task.date.toDate().toISOString()

						});

					}

				}, error: (e) => console.error('Error:', e)

			});

		}

	}

	public startEditing(field: boolean): void{

		this.editingField = field;

	}

	get formattedDate(): string {

		return formatDate(

			this.taskForm.get('date')?.value, 
			'dd/MM/yyyy', 
			'es-ES'

		);

	}

	public saveChanges(field: boolean, event: any): void {

		this.editingField = null;
		const value = event.target?.value;
		this.taskForm.get(field ? 'title' : 'description')?.setValue(value);

		this.saveTask();

	}

	public saveTask(): void {

		if (this.taskForm.valid && this.task.id){

			this.store.update(this.task.id, {

				...this.taskForm.value,
				date: Timestamp.fromDate(new Date(

					this.taskForm.get('date')?.value

				))

			}).then((t) => {

				console.log(t);

			}).catch(console.error);

		}

	}

	public deleteTask(): void {

		if (this.task.id) {

			this.store.delete(this.task.id).then((succes) => {

				if (succes){

					this.router.navigate(['/home'])

				}

			});

		}

	}

}
