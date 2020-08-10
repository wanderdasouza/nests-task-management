import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query() filterDTO: GetTasksFilterDTO): Task[] {
        if(Object.keys(filterDTO).length) {
            return this.taskService.getTasksWithFilters(filterDTO);
        }
        else {
            return this.taskService.getAllTasks();
        }
        
    }

    @Post()
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
        return this.taskService.createTask(createTaskDTO);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }

    @Put('/:id/status')
    updateTaskStatus(
        @Param('id') id: string, 
        @Body('status') status: TaskStatus): Task {
            return this.taskService.updateTaskStatus(id, status);
    }
}
