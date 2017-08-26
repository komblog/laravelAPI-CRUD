const urlAPI = "http://localhost:8000/api/lists";

let page = 1;
let current_page = 1;
let total_page = 0;
let is_ajax_fire = 0;

manageData();

/* manage data list */
function manageData() {
    $.ajax({
        dataType: 'json',
        url: urlAPI,
        data: {page:page}
    }).done(function(data){

        total_page = data.last_page;
        current_page = data.current_page;

        $('#pagination').twbsPagination({
            totalPages: total_page,
            visiblePages: current_page,
            onPageClick: function (event, pageL) {
                page = pageL;
                if(is_ajax_fire != 0){
                  getPageData();
                }
            }
        });

        manageRow(data.data);
        is_ajax_fire = 1;
    });
}

$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});

/* Get Page Data*/
function getPageData() {
    $.ajax({
        dataType: 'json',
        url: urlAPI,
        data: {page:page}
    }).done(function(data){
        manageRow(data.data);
    });
}

/* Add new Item table row */
function manageRow(data) {
    let rows = '';
    $.each( data, function( key, value ) {
        rows = rows + '<tr class="item'+value._id+'">';
        rows = rows + '<td>'+value.name+'</td>';
        rows = rows + '<td>'+value.address+'</td>';
        rows = rows + '<td>'+value.email+'</td>';
        rows = rows + '<td>'+value.contact+'</td>';
        rows = rows + '<td><button data-placement="top" data-toggle="tooltip" title="Edit" class="edit-modal btn btn-primary btn-xs"\n\
                       data-id="'+value._id+'" data-name="'+value.name+'" data-address="'+value.address+'"\n\
                       data-email="'+value.email+'" data-contact="'+value.contact+'"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>';
        rows = rows + '<td><button data-placement="top" data-toggle="tooltip" title="Delete" class="delete-modal btn btn-danger btn-xs"\n\
                       data-id="'+value._id+'" data-name="'+value.name+'"><i class="fa fa-trash-o" aria-hidden="true"></i></button>'    
        rows = rows + '</tr>';
    });

    $("tbody").html(rows);
}

$(document).ready( function() {
    //show modal when edit button clicked
    $(document).on('click', '.edit-modal', function() {
       
        $('#footer_action_button').text("Update");
        $('#footer_action_button').addClass('glyphicon-check');
        $('#footer_action_button').removeClass('glyphicon-trash');
        $('.actionBtn').addClass('btn-success');
        $('.actionBtn').removeClass('btn-danger btn-primary add delete');
        $('.actionBtn').addClass('edit');
        $('.modal-title').text('Edit');
        $('.deleteContent').hide();
        $('.form-horizontal').show();
        $('#fid').val($(this).data('id'));
        $('#fname').val($(this).data('name'));
        $('#faddress').val($(this).data('address'));
        $('#femail').val($(this).data('email'));
        $('#fcontact').val($(this).data('contact'));
        $('#myModal').modal('show');
    });
    //show modal when delete button clicked
    $(document).on('click', '.delete-modal', function() {
       
        $('#footer_action_button').text(" Delete");
        $('#footer_action_button').removeClass('glyphicon-check');
        $('#footer_action_button').addClass('glyphicon-trash');
        $('.actionBtn').removeClass('btn-success');
        $('.actionBtn').addClass('btn-danger');
        $('.actionBtn').addClass('delete');
        $('.modal-title').text('Delete');
        $('.did').text($(this).data('id'));
        $('.deleteContent').show();
        $('.form-horizontal').hide();
        $('.dname').html($(this).data('name'));
        $('#myModal').modal('show');
    });
    //show modal when add button clicked
    $(document).on('click', '.add-modal', function() {
      
        $('#footer_action_button').text("Add");
        $('#footer_action_button').addClass('glyphicon-plus');
        $('#footer_action_button').removeClass('glyphicon-trash glyphicon-check');
        $('.actionBtn').removeClass('btn-success btn-danger edit delete');
        $('.actionBtn').addClass('btn-primary');
        $('.actionBtn').addClass('add');
        $('.modal-title').text('Add new user');       
        $('.deleteContent').hide();
        $('.form-horizontal').show(); 
        $('.form-horizontal').trigger("reset");
        $('#myModal').modal('show');
        
    });
    //save data when button add clicked
    $('.modal-footer').on('click', '.add', function(e) {
        e.preventDefault();
        const formData = {
            name : $('#fname').val(),
            address : $('#faddress').val(),
            email : $('#femail').val(),
            contact : $('#fcontact').val()
        }
        $.ajax({
            dataType: 'JSON',
            type: 'POST',
            url: urlAPI,
            data: formData,
            success: function() {
                getPageData();
                $('.form-horizontal').trigger("reset");                
            }
        });
    });
    //edit data when update button clicked
    $('.modal-footer').on('click', '.edit', function(e) {
        e.preventDefault();
        const _id = $("#fid").val();
        $.ajax({
            dataType: 'JSON',
            type: 'PUT',
            url: urlAPI + '/' + _id ,
            data: {
                name: $('#fname').val(),
                address : $('#faddress').val(),
                email: $('#femail').val(),
                contact : $('#fcontact').val()
            },
            dataType: 'json',
            success: function() {
                getPageData();
                $('.form-horizontal').trigger("reset");
            }
        });
    });
    //delete data when delete button clicked
    $('.modal-footer').on('click', '.delete', function(e) {
        e.preventDefault();
        const _id = $('.did').text();        
        $.ajax({
            dataType: 'JSON',
            type: 'DELETE',
            url: urlAPI + '/' + _id,
            data: {
                'id': $('.did').text()
            },
            success: function() {
                $('.item' + $('.did').text()).remove();
                getPageData();
            }
        });
    });
});