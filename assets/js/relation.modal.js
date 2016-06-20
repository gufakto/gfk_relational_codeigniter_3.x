/**
* Relation table with modal bootstrap in Codeigniter 3.x
* Author 		: sgufakto siagian
* Created Date 	: 19/06/2016
* File name 	: relation.modal.js
* required  	: bootstra 3.x css and js , datatables for bootstrap, 
* 				  also you need to use jquery with min required jQuery-2.1.4 
*
* ========================================================================================================================
* to activated this javascript feature, you can cal in footer your html like this
* <script src="path_to/relation.modal.js"></script>
* 
* and initialize your baseurl like this
* var baseurl = base_url();
*
*==========================================================================================================================
* =========================================================================================================================
* if you want to use datatables please call set_modal_dt() function
* if you did not use datatables please call set_model() function
* =========================================================================================================================
 _____     __    __   ______   ________   __   ___  __________    ______
/   __|   |  |  |  | |   ___\ /   __   \ |  | /  / |  _    _  |  /   _   \
|  | ___  |  |  |  | |  |___  |  |__|  | |  |/  /  |_/ |  | \_| |   / \   |
|  | \  | |  |  |  | |   __/  |   __   | |     |       |  |     |  |   |  |
|  |_/  | |  \__/  | |  |     |  |  |  | |  |\  \      |  |     |   \_/   |
 \_____/   \______/  |__|     |__|  |__| |__| \ _\     |__|      \_______/ 

*/

	
	/*Append modal bootstrap into body html*/
	var Relation = {
		id    		: 'rel-modal',
		table_id 	: 'dt-modal-rel',
		url  		: null,
		title 		: '',
		target 		: '',
		order_column: null,
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
			$("body").append('<div class="modal fade" id="'+this.id+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"><div>');
			$("#" + this.id).append('<div class="modal-dialog modal-lg"></div>');
			$("#" + this.id + " .modal-dialog").append('<div class="modal-content"></div>');
			$("#" + this.id + " .modal-content").append('<div class="modal-header"></div>');
			$("#" + this.id + " .modal-content").append('<div class="modal-body"></div>');
			$("#" + this.id + " .modal-content").append('<div class="modal-footer"></div>');
			$("#" + this.id + " .modal-header").append('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
			$("#" + this.id + " .modal-header").append('<h4 class="modal-title modal-info">Modal title</h4>');
			$("#" + this.id + " .modal-body").append('<div class="input-group input-group-sm pull-right"></div>');
			$("#" + this.id + " .input-group").append('<input type="text" name="search_modal_rel" placeholder="Search" class="form-control form-sm pull-right" style="width: 200px;">');
			$("#" + this.id + " .modal-body").append('<table class="table table-striped" id="'+this.table_id+'"></table>');
			$("#" + this.id + " .modal-body table#" + this.table_id).append('<thead></thead>');
			$("#" + this.id + " .modal-body table#" + this.table_id).append('<tbody></tbody>');
			$("#" + this.id + " .modal-body").append('<div class="page"></div>');
			$("#" + this.id + " .modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');

			/*$("body").append('<div class="modal fade" id="'+this.id+'"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">'+
			  '<div class="modal-dialog modal-lg">'+
			    '<div class="modal-content">'+
			      '<div class="modal-header">'+
			        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
			        '<h4 class="modal-title modal-info">Modal title</h4>'+
			      '</div>'+
			      '<div class="modal-body">'+
			      	'<div class="input-group input-group-sm pull-right">'+
			      	'<input type="text" name="search_modal_rel" placeholder="Search" class="form-control form-sm pull-right" style="width: 200px;">'+
			      	'</div>'+
			        '<table class="table table-striped" id="'+this.table_id+'">'+
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
			'</div>');*/
		},
		setData: function(data){
			var modal = $( "#" + this.id );
			  modal.modal('show');
			  modal.find(".modal-title").text( this.title );
			  modal.find(".modal-body > table > thead").html(data.thead);
			  modal.find(".modal-body > table > tbody").html(data.tbody);
			  modal.find(".modal-body > .page").html(data.pagination);			  
		}, 
		setHeaderTable: function( data )
		{
			var modal = $("#" + this.id);
			modal.find(".modal-body table >thead").html( data.thead );
		},
		setContent: function(data){
			var modal = $( "#" + this.id );
			modal.find(".modal-body > table > tbody").html(data.tbody);
			modal.find(".modal-body > .page").html(data.pagination);
			modal.find(".modal-body > div.page ul.pagination").find("li").each(function(){
				var change_link = $(this).find("a");
				if( change_link.attr("href") != undefined ){
					change_link.attr("onclick", 'return link_pagination(\''+change_link.attr("href")+'\');');
					change_link.attr("href", "javascript:void(0);");
				}
				
			});
		},
		configPaging: function(){
			var modal = $( "#" + this.id );
			modal.find(".modal-body > div.page ul.pagination").find("li").each(function(){
				var change_link = $(this).find("a");
				if( change_link.attr("href") != undefined ){
					change_link.attr("onclick", 'return link_pagination(\''+change_link.attr("href")+'\');');
					change_link.attr("href", "javascript:void(0);");
				}
			});
		},
		setDatatables: function(){
			var modal = $( "#" + this.id );
			modal.modal('show');			
			modal.find(".input-group > input[name=search_modal_rel]").remove();
		}
	};

/*pagination if not use datatables*/
function link_pagination( link )
{
	$.get( link, function(data){
		Relation.setContent(data);
	}, "json");
}


/*Not for datatables*/
function set_model(url, title, target )
{
	$("#"+Relation.id).modal();
	$.get( url, function(data){
		Relation.setURL( url );
		Relation.setTitle( title );
		Relation.init();
		Relation.setData( data );
		Relation.setTarget( target );
		Relation.configPaging();
	}, "json");

}

/* use this function if you want make table as a server side datatables */
function set_modal_dt( url, title, target )
{
	$("#"+Relation.id).modal();
	Relation.setURL( url );
	Relation.setTitle( title );
	Relation.init();
	Relation.setDatatables();
	Relation.setTarget( target );
	$.get( Relation.url + "/column_head", function(data){
		Relation.setHeaderTable( data );
	}, "json" );

	$.get( Relation.url + "/column", function(data){
	     var table = $("#"+Relation.table_id).DataTable({
	           "processing" : true,
	           "serverSide" : true,
	           "stateSave"  : true,
	           "ajax"       : Relation.url,
	           "columns"    : data.col,
	           'columnDefs': [{
	               'searchable' : false,
	               'orderable'  : false,
	               'targets'    : data.pk
	           }],
	           'order'     : [[ 1, 'asc' ]]
	     });
	     if( Relation.order_column )
	     {
	     	table.on( 'order.dt search.dt', function () {
	     	    table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
	     	        cell.innerHTML = i+1;
	     	    } );
	     	}).draw();
	     }
	 }, "json" );

}

/*
 * set value from table modal to target with idx
 * idx is index of row in tr table
 */
function check_data_modal(element, idx)
{
	$(Relation.target).val( $("#"+element.id).closest("tr").find("td:eq("+idx+")").text() );
	$("#"+Relation.id).modal("hide");
	$('#'+Relation.id).modal('hide').remove();
	$('.modal-backdrop').remove();
}

$(function(){
	/* remove modal from body document */
	$('body').on('click', 'button[data-dismiss="modal"]', function () {
	  $('#'+Relation.id).modal('hide').remove();
	  $('.modal-backdrop').remove();
	});

	/* searchable if not use datatables */
	$('body').on('keypress', 'input[name="search_modal_rel"]', function () {
	  $.get( Relation.url, { search : $(this).val() }, function(data){
	  	Relation.setContent(data);
	  }, "json");
	});
});
