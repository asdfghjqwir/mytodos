class Api::V1::TodosController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_todo, only: [:update, :destroy]

  def index
    todos = current_api_v1_user.todos.order(created_at: :desc)
    render json: todos
  end

  def create
    todo = current_api_v1_user.todos.build(todo_params)
    if todo.save
      render json: todo, status: :created
    else
      render json: { errors: todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @todo.destroy
    head :no_content
  end

  private

  def set_todo
    @todo = current_api_v1_user.todos.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Todo not found' }, status: :not_found
  end

  def todo_params
    params.require(:todo).permit(:title, :completed)
  end
end
