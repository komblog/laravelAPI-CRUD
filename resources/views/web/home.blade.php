@extends('app')
	@section('content')
		<div class="panel panel-default">
  			<div class="panel-heading text-right">
  				<button data-placement="left" data-toggle="tooltip" title="Add" class="add-modal btn btn-primary btn-md"><i class="fa fa-plus" aria-hidden="true"></i></button>
  			</div>

  			<div class="panel-body">
  				<div class="col-md-auto">
	    			<table class="table table-hover">
					 	<thead>
					    	<tr>
					      		<th>Name</th>
					      		<th>Address</th>
					      		<th>Email</th>
					      		<th>Contact</th>
					      		<th>Edit</th>
					      		<th>Delete</th>
					    	</tr>
					  	</thead>
					  	<tbody class="items">
					  	</tbody>
					</table>
    			</div>
    		</div>
    		<nav id="pagination" aria-label="Page navigation example" class="pull-right"></nav>
  		</div>
  		<div id="myModal" class="modal fade" role="dialog">
	  		<div class="modal-dialog">
	  			<!-- Modal content-->
	  			<div class="modal-content">
	  				<div class="modal-header">
	  					<button type="button" class="close" data-dismiss="modal">&times;</button>
	  					<h4 class="modal-title"></h4>
	  				</div>
	  				<div class="modal-body">
	  					<form class="form-horizontal" role="form">`
	  						<input type="hidden" id="fid">
	  						<div class="form-group">
	  							<label class="control-label col-sm-2" for="name">Name:</label>
	  							<div class="col-sm-10">
	  								<input type="name" class="form-control" id="fname" required>
	  							</div>
	  						</div>
	  						<div class="form-group">
	  							<label class="control-label col-sm-2" for="address">Address:</label>
	  							<div class="col-sm-10">
	  								<input type="text" class="form-control" id="faddress" required>
	  							</div>
	  						</div>
	  						<div class="form-group">
	  							<label class="control-label col-sm-2" for="email">Email:</label>
	  							<div class="col-sm-10">
	  								<input type="email" class="form-control" id="femail" required>
	  							</div>
	  						</div>
	  						<div class="form-group">
	  							<label class="control-label col-sm-2" for="contact">Contact:</label>
	  							<div class="col-sm-10">
	  								<input type="text" class="form-control" id="fcontact" required>
	  							</div>
	  						</div>
	  					</form>
	  					<div class="deleteContent">
	  						<div class="alert alert-danger"> Are you sure you want to delete 
	  							<b><span class="dname"></span></b> ? <span class="hidden did"></span>
	  						</div>
	  					</div>
	  					<div class="modal-footer">
	  						<button type="button" class="btn actionBtn" data-dismiss="modal">
	  							<span id="footer_action_button" class='glyphicon'> </span>
	  						</button>
	  						<button type="button" class="btn btn-warning" data-dismiss="modal">
	  							<span class='glyphicon glyphicon-remove'></span> Close
	  						</button>
	  					</div>
	  				</div>
	  			</div>
			</div>
		</div>
	@endsection
