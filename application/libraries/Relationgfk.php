<?php
/**
* Relation table with modal bootstrap in Codeigniter 3.x
* Author 		: sgufakto siagian
* Created Date 	: 19/06/2016
* License 		: MIT
* File name 	: Relationgfk.php
*
* @task we need to add a searching in this relation table
* if you want to use this feature please make in your view like this
* <input type="text" class="form-control" name="kode_coa" id="kode_coa" placeholder="Kode Coa" value="<?php echo $kode_coa; ?>" />
* <a href="javascript:void(0);" onclick="set_model('<?php echo base_url(); ?>index.php/mak/get_data', 'Relation Role', 'input[name=kode_coa]')" class="btn btn-sm btn-danger">Browse</a>
*
* to call this class and function from controller you can make like this
*
* echo  $this->relationgfk->get_relation(
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
*/
class Relationgfk
{

	/*
	 * Construct of Relationgfk to initialize 
	 * all we need in this class 
	 * e.g helper, config, library, model etc...
	 */
	public function __construct()
	{

		$this->_ci = get_instance();
		$this->_ci->load->helper('inflector');
		$this->_ci->load->library('pagination');
	}

	/*
	 * Set content html for display table to generate relational table
	 * $table 				Relation table name in database
	 * $pk 					Relation Table Primary key  in database
	 * $link_pagination		URL for pagination to display modal view
	 * $page 				URI Segment to every link in pagination (default is 0)
	 * $field_show 			Field name from relation table to show in html table
	 * $search 				Searching string for every field in table
	 * $action 				If $action FALSE, no action display in html table if TRUE action will show
	 *
	 *
	 * return json 			this will return content of table to display in modal view
	 */
	public function get_relation( $table, $pk, $link_pagination,$page,  $field_show=array(), $search=null, $action=FALSE )
	{
		$_html=array('thead'=> null, 'tbody' => null, 'pagination'=>null );
		
		if( $search )
		{
			if( !count( $field_show ) )
			{
				$fields = $this->_ci->db->list_fields($table);
				$this->_ci->db->like($pk, $search);
				foreach ($fields as $key_field) 
				{
					if( $key_field != $pk )
					{
						$this->_ci->db->or_like($key_field, $search);
					}
				}
				$this->_ci->db->from( $table );
				$total_rows = $this->_ci->db->count_all_results();
			}
			else
			{
				$this->_ci->db->like($pk, $search);
				foreach ($field_show as $key_field) 
				{
					if( $key_field != $pk )
					{
						$this->_ci->db->or_like($key_field, $search);
					}
				}
				$this->_ci->db->from( $table );
				$total_rows = $this->_ci->db->count_all_results();
			}
		}
		else
		{
			$total_rows = $this->_ci->db->count_all_results($table);
		}
		
		$config['base_url'] 	= $link_pagination;
		$config['total_rows'] 	= $total_rows;
		$config['per_page'] 	= 10;
		$this->_ci->pagination->initialize($config);
		
		if( !count( $field_show ) )
		{
			$_html['thead'] = '<tr>';
			$fields = $this->_ci->db->list_fields($table);
			foreach ($fields as $key_field) 
			{
				$_html['thead'] .= '<th>'.humanize($key_field).'</th>';
			}
			$_html['thead'] .= $action ? '<th>Action</th></tr>' : '</tr>';
		}
		else
		{
			$_html['thead'] = '<tr>';
			foreach ($field_show as $key_field) 
			{
				$_html['thead'] .= '<th>'.humanize($key_field).'</th>';
			}
			$_html['thead'] .= $action ? '<th>Action</th></tr>' : '</tr>';
		}
		
		if( $search )
		{
			if( !count( $field_show ) )
			{
				$fields = $this->_ci->db->list_fields($table);
				$this->_ci->db->select('*');
				$this->_ci->db->like($pk, $search);
				foreach ($fields as $key_field) 
				{
					if( $key_field != $pk )
					{
						$this->_ci->db->or_like($key_field, $search);
					}
				}
				$this->_ci->db->order_by($pk, 'ASC');
				$this->_ci->db->limit( $config['per_page'], $page);
				$data = $this->_ci->db->get($table);
			}
			else
			{
				$this->_ci->db->select('*');
				$this->_ci->db->like($key_field, $search);
				foreach ($field_show as $key_field) 
				{
					if( $key_field != $pk )
					{
						$this->_ci->db->or_like($key_field, $search);
					}
				}
				$this->_ci->db->order_by($pk, 'ASC');
				$this->_ci->db->limit( $config['per_page'], $page);
				$this->_ci->db->from($table);
				$data = $this->_ci->db->get();
			}
		}
		else
		{
			$this->_ci->db->select('*');
			$this->_ci->db->order_by($pk, 'ASC');
			$this->_ci->db->limit( $config['per_page'], $page);
			$data = $this->_ci->db->get($table);
		}
		//$data = $this->_ci->db->query("select * from {$table} order by {$pk} asc limit ".$page.", ".$config['per_page']."");
		if( $data->num_rows() )
		{
			$_html['tbody'] = '';
			foreach ($data->result() as $key => $value) 
			{
				$_html['tbody'] .= '<tr id="Col'. $value->{$pk} .'">';
				if( !count( $field_show ) )
				{
					$fields = $this->_ci->db->list_fields($table);
					foreach ($fields as $key_field) 
					{
						$_html['tbody'] .= '<td>'.$value->{$key_field}.'</td>';
					}
				}
				else
				{
					foreach ($field_show as $key_field) 
					{
						$_html['tbody'] .= '<td>'.$value->{$key_field}.'</td>';
					}
				}
				$_html['tbody'] .= $action ? '<td><a href="javascript:void(0);" onclick="check_data_modal(this);" id="Col'.$value->{$pk}.'" class="btn btn-sm btn-info">Check</a></td></tr>' : '</tr>';
			}
		}
		$_html['pagination'] = $this->_ci->pagination->create_links();

		return json_encode( $_html );
	}
}