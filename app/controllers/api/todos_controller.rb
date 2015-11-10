class Api::TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos.to_json
  end

  def show
    @todo = Todo.find(params[:id])
    render json: @todo.to_json
  end

  def create!
    @todo = Todo.new(todo_params)
    @todo.save!
  end

  def update!
    @todo = Todo.find(params[:id])
    @todo.update!(todo_params)
  end

  def destroy!
    @todo = Todo.find(params[:id])
    @todo.destroy!
  end

private
  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end

end
