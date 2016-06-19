/**
* Relation table with modal bootstrap in Codeigniter 3.x
* Author 		: sgufakto siagian
* Created Date 	: 19/06/2016
* License 		: MIT
* File name 	: relation.modal.js
* required  	: bootstra 3.x css and js , also you need to use jquery with min required jQuery-2.1.4 
*
* @task we need to add a searching in this relation table
* to activated this javascript feature, you can cal in footer your html like this
* <script src="<?php echo base_url(); ?>assets/relation/relation.modal.js"></script>
* 
* and initialize your baseurl like this
* var baseurl = '<?php echo base_url(); ?>';
*/

	var data = [];
	/*Append modal bootstrap into body html*/
	var Relation = {
		id   : 'rel-modal',
		url  : null,
		title: '',
		target: '',
		setTarget: function(target){
			this.target = target;
		},
		setTitle: function(title){
			this.title = title;
		},
		setURL: function(url){
			this.url = url;
		},
		init : function(){
			$("body").append('<div class="modal fade" id="'+this.id+'"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">'+
			  '<div class="modal-dialog modal-lg">'+
			    '<div class="modal-content">'+
			      '<div class="modal-header">'+
			        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
			        '<h4 class="modal-title">Modal title</h4>'+
			      '</div>'+
			      '<div class="modal-body">'+
			      	'<div class="input-group input-group-sm pull-right">'+
			      	'<input type="text" name="search_modal_rel" placeholder="Search" class="form-control form-sm pull-right" style="width: 200px;">'+
			      	'</div>'+
			        '<table class="table table-striped" id="dt-modal-rel">'+
			        '<thead>'+
			        '</thead>'+
			        '<tbody>'+
			        '</tbody>'+
			        '</table>'+
			        '<div class="page"></div>'+
			      '</div>'+
			      '<div class="modal-footer">'+
			        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
			      '</div>'+
			    '</div>'+
			  '</div>'+
			'</div>');
		},
		setData: function(data){
			var modal = $( "#" + this.id );
			  modal.modal('show');
			  modal.find(".modal-title").text( this.title );
			  modal.find(".modal-body > table > thead").html(data.thead);
			  modal.find(".modal-body > table > tbody").html(data.tbody);
			  modal.find(".modal-body > .page").html(data.pagination);			  
		}, 
		setContent: function(data){
			var modal = $( "#" + this.id );
			modal.find(".modal-body > table > tbody").html(data.tbody);
			modal.find(".modal-body > .page").html(data.pagination);
			modal.find(".modal-body > div.page ul.pagination").find("li").each(function(idx){
				var change_link = $(this).find("a");
				if( change_link.attr("href") != undefined ){
					change_link.attr("onclick", 'return link_pagination(\''+change_link.attr("href")+'\');');
					change_link.attr("href", "javascript:void(0);");
				}
				
			});
		},
		configPaging: function(){
			var modal = $( "#" + this.id );
			modal.find(".modal-body > div.page ul.pagination").find("li").each(function(idx){
				var change_link = $(this).find("a");
				if( change_link.attr("href") != undefined ){
					change_link.attr("onclick", 'return link_pagination(\''+change_link.attr("href")+'\');');
					change_link.attr("href", "javascript:void(0);");
				}
			});
		}
	};

function link_pagination( link )
{
	$.get( link, function(data){
		Relation.setContent(data);
	}, "json");
}

function set_model(url, title, target )
{
	$("#rel-modal").modal();
	$.get( url, function(data){
		Relation.setURL( url );
		Relation.setTitle( title );
		Relation.init();
		Relation.setData( data );
		Relation.setTarget( target );
		Relation.configPaging();
	}, "json");

}

function check_data_modal(element)
{
	$(Relation.target).val( $("tr#"+element.id).find("td:eq(0)").text() );
	$("#rel-modal").modal("hide");
	$('#rel-modal').modal('hide').remove();
	$('.modal-backdrop').remove();
}

$(function(){
	$('body').on('click', 'button[data-dismiss="modal"]', function () {
	  $('#rel-modal').modal('hide').remove();
	  $('.modal-backdrop').remove();
	});

	$('body').on('keypress', 'input[name="search_modal_rel"]', function () {
	  $.get( Relation.url, { search : $(this).val() }, function(data){
	  	Relation.setContent(data);
	  }, "json");
	});
});