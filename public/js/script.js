
const urlAPI = "http://localhost:8000/api/lists";
$(document).ready( function() {
    $(document).on('click', '.edit-modal', function(e) {
        e.preventDefault();
        $('#footer_action_button').text("Update");
        $('#footer_action_button').addClass('glyphicon-check');
        $('#footer_action_button').removeClass('glyphicon-trash');
        $('.actionBtn').addClass('btn-success');
        $('.actionBtn').removeClass('btn-danger');
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
    $(document).on('click', '.delete-modal', function(e) {
        e.preventDefault();
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
    $(document).on('click', '.add-modal', function(e) {
        e.preventDefault();
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
    $('.modal-footer').on('click', '.add', function(e) {
        e.preventDefault();
        const formData = {
            _token : $('input[name=_token]').val(),
            _id : $("#fid").val(),
            name : $('#fname').val(),
            address : $('#faddress').val(),
            email : $('#femail').val(),
            contact : $('#fcontact').val()
        }
        $.ajax({
            type: 'POST',
            url: urlAPI,
            data: formData,
            dataType : 'json',
            success: function(data) {
                console.log(data);
                $('.items').append("<tr class='item" + data._id + "'>\n\
                                              <td>" + data.name + "</td>\n\
                                              <td>" + data.address + "</td>\n\
                                              <td>" + data.email + "</td>\n\
                                              <td>" + data.contact + "</td>\n\
                                              <td><button data-placement='top' data-toggle='tooltip' title='Edit' class='edit-modal btn btn-primary btn-xs' data-id='"+ data._id +"' data-name='"+ data.name +"' data-address='"+ data.address +"' data-email='"+ data.email +"' data-contact='"+ data.contact +"'><i class='fa fa-pencil' aria-hidden='true'></i></button></td>\n\
                                              <td><button data-placement='top' data-toggle='tooltip' title='Delete' class='delete-modal btn btn-danger btn-xs' data-id='"+ data._id +"' data-name='"+ data.name +"'><i class='fa fa-trash-o' aria-hidden='true'></i></button></td>\n\
                                              </tr>");
                $('.form-horizontal').trigger("reset");
            }
        });
    });
    $('.modal-footer').on('click', '.edit', function(e) {
        e.preventDefault();
        const _id = $("#fid").val();
        $.ajax({
            type: 'PUT',
            url: urlAPI + '/' + _id ,
            data: {
                '_token': $('input[name=_token]').val(),
                '_id': $("#fid").val(),
                'name': $('#fname').val(),
                'address' : $('#faddress').val(),
                'email': $('#femail').val(),
                'contact' : $('#fcontact').val()
            },
            dataType: 'json',
            success: function() {
                const _id = $("#fid").val();
                const name = $('#fname').val();
                const address = $('#faddress').val();
                const email = $('#femail').val();
                const contact = $('#fcontact').val();
                $('.item' + _id).replaceWith("<tr class='item" + _id + "'>\n\
                                              <td>" + name + "</td>\n\
                                              <td>" + address + "</td>\n\
                                              <td>" + email + "</td>\n\
                                              <td>" + contact + "</td>\n\
                                              <td><button data-placement='top' data-toggle='tooltip' title='Edit' class='edit-modal btn btn-primary btn-xs' data-id='"+ _id +"' data-name='"+ name +"' data-address='"+ address +"' data-email='"+ email +"' data-contact='"+ contact +"'><i class='fa fa-pencil' aria-hidden='true'></i></button></td>\n\
                                              <td><button data-placement='top' data-toggle='tooltip' title='Delete' class='delete-modal btn btn-danger btn-xs' data-id='"+ _id +"' data-name='"+ name +"'><i class='fa fa-trash-o' aria-hidden='true'></i></button></td>\n\
                                              </tr>");
                $('.form-horizontal').trigger("reset");
            }
        });
    });
    $('.modal-footer').on('click', '.delete', function(e) {
        e.preventDefault();
        const _id = $('.did').text();        
        $.ajax({
            type: 'DELETE',
            url: urlAPI + '/' + _id,
            data: {
                '_token': $('input[name=_token]').val(),
                'id': $('.did').text()
            },
            error: function (data) {
                console.log('Error:', data);
            },
            success: function(data) {
                $('.item' + $('.did').text()).remove();
            }
        });
    });
});
