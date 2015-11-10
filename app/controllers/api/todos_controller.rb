class Api::TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos
  end

  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  def create
    @todo = Todo.new(todo_params)
    @todo.save!
    render json: @todo
  end

  def update
    @todo = Todo.find(params[:id])
    unless @todo.nil?
      @todo.update!(todo_params)
      render json: @todo
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    unless @todo.nil?
      @todo.destroy!
      render json: @todo
    end
  end

private
  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end

end
