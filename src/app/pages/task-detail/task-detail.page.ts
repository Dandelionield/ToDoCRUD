import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { TaskService } from '@task/services/task/task.service';
import { Task } from '@entities/task.entity';

@Component({

	selector: 'app-task-detail',
	templateUrl: './task-detail.page.html',
	styleUrls: ['./task-detail.page.scss'],
	standalone: false

}) export class TaskDetailPage implements OnInit, OnDestroy {

	public task!: Task;
	public taskForm!: FormGroup;
	private destroy$ = new Subject<void>();
	public editingField!: boolean | null;

	public constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private store: TaskService) {

		this.taskForm = this.fb.group({

			title: ['', [Validators.required, Validators.maxLength(50)]],
			description: ['', Validators.maxLength(200)],
			date: [new Date(), Validators.required],
			done: [false]

		});

	}

	public ngOnInit(): void {

		const id: string = this.route.snapshot.paramMap.get('id') as string;

		this.store.find(id).subscribe({

			next: (t) => {

				this.task = t as Task;

				this.taskForm.patchValue({

					...this.task,
					date: this.task.date.toDate()

				});

				this.setupAutoSave();/**/

			}, error: (e) => console.error('Error:', e)

		});

	}

	public startEditing(field: boolean): void{

		this.editingField = field;

	}

	public saveChanges(field: boolean, event: any): void {

		this.editingField = null;
		const value = event.target?.value;
		this.taskForm.get(field ? 'title' : 'description')?.setValue(value);

		if (this.taskForm.valid && this.task.id){

			this.store.update(this.task.id, this.taskForm.value).catch(console.error);

		}

	}

	private setupAutoSave(): void {

		this.taskForm.valueChanges.pipe(

			debounceTime(800),
			takeUntil(this.destroy$)

		).subscribe(() => {

			if (this.taskForm.valid && this.task.id) {

				this.store.update(this.task.id, {

					...this.taskForm.value,
					date: new Date(this.taskForm.value.date)

				}).catch(console.error);

			}

		});

	}

	public handleDateChange(event: any): void {

		this.taskForm.patchValue({

			date: new Date(event.detail.value).toISOString()

		});

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

	public ngOnDestroy(): void {

		this.destroy$.next();
		this.destroy$.complete();

	}

}
