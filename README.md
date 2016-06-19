# 
 Relation table with modal bootstrap in Codeigniter 3.x
 Author 		: sgufakto siagian
 Created Date 	: 19/06/2016
 
 File name 	: Relationgfk.php
*
 @task we need to add a searching in this relation table
 if you want to use this feature please make in your view like this
 <input type="text" class="form-control" name="kode_coa" id="kode_coa" placeholder="Kode Coa" value="<?php echo $kode_coa; ?>" />
 <a href="javascript:void(0);" onclick="set_model('<?php echo base_url(); ?>index.php/mak/get_data', 'Relation Role', 'input[name=kode_coa]')" class="btn btn-sm btn-danger">Browse</a>
*
 to call this class and function from controller you can make like this
*
 echo  $this->relationgfk->get_relation(
 'siswa',
 'id',
 base_url() . 'index.php/mak/get_data',
 $page,
 [
     'id',
     'nama'
 ],
 $this->input->get('search') ? $this->input->get('search') : null,
 TRUE
 );


 Relation table with modal bootstrap in Codeigniter 3.x
 Author 		: sgufakto siagian
 Created Date 	: 19/06/2016
 
 File name 	: relation.modal.js
 required  	: bootstra 3.x css and js , also you need to use jquery with min required jQuery-2.1.4 
*
 @task we need to add a searching in this relation table
 to activated this javascript feature, you can cal in footer your html like this
 <script src="<?php echo base_url(); ?>assets/relation/relation.modal.js"></script>
 
 and initialize your baseurl like this
 var baseurl = '<?php echo base_url(); ?>';