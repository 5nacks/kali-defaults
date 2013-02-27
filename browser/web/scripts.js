var releases;
var mirrors;
jQuery(document).ready(function(){
	if (jQuery('.offsec-download-box').length > 0) {
		offsecDownloadInitForm();
	}
});

function offsecDownloadInitForm()
{
	jQuery.getScript("/wp-content/plugins/offsec-download-counter/cache/releases.js", function(data, textStatus, jqxhr) {
		var rel_id = releases[0]['rel_id'];
		var current_fla_id = jQuery('#rel_fla_id-' + rel_id).val();
		current_fla_id = parseInt(current_fla_id);
		if (isNaN(current_fla_id)) {
			current_fla_id = releases[0]['flavors'][0]['rel_id'];
			jQuery('#rel_fla_id-' + rel_id).val(current_fla_id);
		}
		offsecDownloadPopulateDownloadForm();
	});
}

function offsecDownloadPopulateDownloadForm()
{
	var ar		= new Array();
	var ars		= 0;
	var wm 		= new Array();
	var wms		= 0;
	var itype	= new Array();
	var itypes  = 0;
	var dtype	= new Array();
	
	var total_flavors = releases[0]['flavors'].length;
	for (var i = 0; i < total_flavors; i++)
	{
		if (i == 0) {
			jQuery('#offsec-download-architecture').append('<option value="' +  releases[0]['flavors'][i]['pla_id']+'" selected="selected">' + releases[0]['flavors'][i]['platform'] + '</option>');
			ar[ar.length] = releases[0]['flavors'][i]['pla_id'];
			ars = releases[0]['flavors'][i]['pla_id'];
			
			jQuery('#offsec-download-wm').append('<option value="' +  releases[0]['flavors'][i]['wm_id']+'" selected="selected">' + releases[0]['flavors'][i]['wm'] + '</option>');
			wm[wm.length] = releases[0]['flavors'][i]['wm_id'];
			wms = releases[0]['flavors'][i]['wm_id'];
			
			jQuery('#offsec-download-itype').append('<option value="' +  releases[0]['flavors'][i]['itype_id']+'" selected="selected">' + releases[0]['flavors'][i]['itype'] + '</option>');
			itype[itype.length] = releases[0]['flavors'][i]['itype_id'];
			itypes = releases[0]['flavors'][i]['itype_id'];
			
			jQuery('#offsec-download-dtype').append('<option value="' +  releases[0]['flavors'][i]['dtype_id']+'" selected="selected">' + releases[0]['flavors'][i]['dtype'] + '</option>');
			dtype[dtype.length] = releases[0]['flavors'][i]['dtype_id'];
			dtypes = releases[0]['flavors'][i]['dtype_id'];
		} else {
			if (ar.indexOf(releases[0]['flavors'][i]['pla_id']) < 0) {
				jQuery('#offsec-download-architecture').append('<option value="' +  releases[0]['flavors'][i]['pla_id']+'">' + releases[0]['flavors'][i]['platform'] + '</option>');
				ar[ar.length] = releases[0]['flavors'][i]['pla_id'];
			}
			if (ars == releases[0]['flavors'][i]['pla_id']) {
				if (wm.indexOf(releases[0]['flavors'][i]['wm_id']) < 0) {
					jQuery('#offsec-download-wm').append('<option value="' +  releases[0]['flavors'][i]['wm_id']+'">' + releases[0]['flavors'][i]['wm'] + '</option>');
				}
			}
			
			if (ars == releases[0]['flavors'][i]['pla_id'] && wms == releases[0]['flavors'][i]['wm_id']) {
				if (itype.indexOf(releases[0]['flavors'][i]['itype_id']) < 0) {
					jQuery('#offsec-download-itype').append('<option value="' +  releases[0]['flavors'][i]['itype_id']+'">' + releases[0]['flavors'][i]['itype'] + '</option>');
				}
			}
			if (ars == releases[0]['flavors'][i]['pla_id'] && wms == releases[0]['flavors'][i]['wm_id'] && itypes == releases[0]['flavors'][i]['itype_id']) {
				if (dtype.indexOf(releases[0]['flavors'][i]['dtype_id']) < 0) {
					jQuery('#offsec-download-dtype').append('<option value="' +  releases[0]['flavors'][i]['dtype_id']+'">' + releases[0]['flavors'][i]['dtype'] + '</option>');
				};
			}
			
		};
	};
	offsecDownloadDisplayFixedData();
}

function offsecDownloadArchitectureChanged(release_id)
{
	var ars		= jQuery('#offsec-download-architecture').val();
	var wm 		= new Array();
	var wms		= jQuery('#offsec-download-wm').val();
	var itype	= new Array();
	var itypes  = jQuery('#offsec-download-itype').val();
	var dtype	= new Array();
	
	jQuery('#offsec-download-wm option').each(function(){
		jQuery(this).remove();
	});
	
	jQuery('#offsec-download-itype option').each(function(){
		jQuery(this).remove();
	});
	
	jQuery('#offsec-download-dtype option').each(function(){
		jQuery(this).remove();
	});
	
	var total_flavors = releases[0]['flavors'].length;
	for (var i = 0; i < total_flavors; i++)
	{
		if (ars == releases[0]['flavors'][i]['pla_id']) {
			if (wm.indexOf(releases[0]['flavors'][i]['wm_id']) < 0) {
				if (wm.length == 0) {
					jQuery('#offsec-download-wm').append('<option value="' +  releases[0]['flavors'][i]['wm_id']+'" selected="selected">' + releases[0]['flavors'][i]['wm'] + '</option>');
					wms = releases[0]['flavors'][i]['wm_id'];
				} else {
					jQuery('#offsec-download-wm').append('<option value="' +  releases[0]['flavors'][i]['wm_id']+'">' + releases[0]['flavors'][i]['wm'] + '</option>');
				}
				wm[wm.length] = releases[0]['flavors'][i]['wm_id'];
				
			}
		}
		
		if (ars == releases[0]['flavors'][i]['pla_id'] && wms == releases[0]['flavors'][i]['wm_id']) {
			if (itype.indexOf(releases[0]['flavors'][i]['itype_id']) < 0) {
				if (itype.length == 0) {
					jQuery('#offsec-download-itype').append('<option value="' +  releases[0]['flavors'][i]['itype_id']+'" selected="selected">' + releases[0]['flavors'][i]['itype'] + '</option>');
					itypes = releases[0]['flavors'][i]['itype_id'];
				} else {
					jQuery('#offsec-download-itype').append('<option value="' +  releases[0]['flavors'][i]['itype_id']+'">' + releases[0]['flavors'][i]['itype'] + '</option>');
				}
				itype[itype.length] = releases[0]['flavors'][i]['itype_id'];
				
			}
		}
		if (ars == releases[0]['flavors'][i]['pla_id'] && wms == releases[0]['flavors'][i]['wm_id'] && itypes == releases[0]['flavors'][i]['itype_id']) {
			if (dtype.indexOf(releases[0]['flavors'][i]['dtype_id']) < 0) {
				if (dtype.length == 0) {
					jQuery('#offsec-download-dtype').append('<option value="' +  releases[0]['flavors'][i]['dtype_id']+'" selected="selected">' + releases[0]['flavors'][i]['dtype'] + '</option>');
					dtypes = releases[0]['flavors'][i]['dtype_id'];
				} else {
					jQuery('#offsec-download-dtype').append('<option value="' +  releases[0]['flavors'][i]['dtype_id']+'">' + releases[0]['flavors'][i]['dtype'] + '</option>');
				}
				dtype[dtype.length] = releases[0]['flavors'][i]['dtype_id'];
			};
		}
	};
	offsecDownloadDisplayFixedData();
}

function offsecDownloadWmChanged(release_id)
{
	var ars		= jQuery('#offsec-download-architecture').val();
	var wms		= jQuery('#offsec-download-wm').val();
	var itype	= new Array();
	var itypes  = jQuery('#offsec-download-itype').val();
	var dtype	= new Array();
	
	jQuery('#offsec-download-itype option').each(function(){
		jQuery(this).remove();
	});
	
	jQuery('#offsec-download-dtype option').each(function(){
		jQuery(this).remove();
	});
	
	var total_flavors = releases[0]['flavors'].length;
	for (var i = 0; i < total_flavors; i++)
	{		
		if (ars == releases[0]['flavors'][i]['pla_id'] && wms == releases[0]['flavors'][i]['wm_id']) {
			if (itype.indexOf(releases[0]['flavors'][i]['itype_id']) < 0) {
				if (itype.length == 0) {
					jQuery('#offsec-download-itype').append('<option value="' +  releases[0]['flavors'][i]['itype_id']+'" selected="selected">' + releases[0]['flavors'][i]['itype'] + '</option>');
					itypes = releases[0]['flavors'][i]['itype_id'];
				} else {
					jQuery('#offsec-download-itype').append('<option value="' +  releases[0]['flavors'][i]['itype_id']+'">' + releases[0]['flavors'][i]['itype'] + '</option>');
				}
				itype[itype.length] = releases[0]['flavors'][i]['itype_id'];
				
			}
		}
		if (ars == releases[0]['flavors'][i]['pla_id'] && wms == releases[0]['flavors'][i]['wm_id'] && itypes == releases[0]['flavors'][i]['itype_id']) {
			if (dtype.indexOf(releases[0]['flavors'][i]['dtype_id']) < 0) {
				if (dtype.length == 0) {
					jQuery('#offsec-download-dtype').append('<option value="' +  releases[0]['flavors'][i]['dtype_id']+'" selected="selected">' + releases[0]['flavors'][i]['dtype'] + '</option>');
					dtypes = releases[0]['flavors'][i]['dtype_id'];
				} else {
					jQuery('#offsec-download-dtype').append('<option value="' +  releases[0]['flavors'][i]['dtype_id']+'">' + releases[0]['flavors'][i]['dtype'] + '</option>');
				}
				dtype[dtype.length] = releases[0]['flavors'][i]['dtype_id'];
			};
		}
	};
	offsecDownloadDisplayFixedData();
}
function offsecDownloadItypeChanged(release_id)
{
	var ars		= jQuery('#offsec-download-architecture').val();
	var wms		= jQuery('#offsec-download-wm').val();
	var itypes  = jQuery('#offsec-download-itype').val();
	var dtype	= new Array();
	
	jQuery('#offsec-download-dtype option').each(function(){
		jQuery(this).remove();
	});
	
	var total_flavors = releases[0]['flavors'].length;
	for (var i = 0; i < total_flavors; i++)
	{		
		if (ars == releases[0]['flavors'][i]['pla_id'] && wms == releases[0]['flavors'][i]['wm_id'] && itypes == releases[0]['flavors'][i]['itype_id']) {
			if (dtype.indexOf(releases[0]['flavors'][i]['dtype_id']) < 0) {
				if (dtype.length == 0) {
					jQuery('#offsec-download-dtype').append('<option value="' +  releases[0]['flavors'][i]['dtype_id']+'" selected="selected">' + releases[0]['flavors'][i]['dtype'] + '</option>');
					dtypes = releases[0]['flavors'][i]['dtype_id'];
				} else {
					jQuery('#offsec-download-dtype').append('<option value="' +  releases[0]['flavors'][i]['dtype_id']+'">' + releases[0]['flavors'][i]['dtype'] + '</option>');
				}
				dtype[dtype.length] = releases[0]['flavors'][i]['dtype_id'];
			};
		}
	};
	offsecDownloadDisplayFixedData();
}
function offsecDownloadDtypeChanged(release_id)
{
	offsecDownloadDisplayFixedData();
}

function offsecDownloadDisplayFixedData()
{
	var ars		= jQuery('#offsec-download-architecture').val();
	var wms		= jQuery('#offsec-download-wm').val();
	var itypes  = jQuery('#offsec-download-itype').val();
	var dtypes	= jQuery('#offsec-download-dtype').val();
	
	var total_flavors = releases[0]['flavors'].length;
	for (var i = 0; i < total_flavors; i++)
	{		
		if (ars == releases[0]['flavors'][i]['pla_id'] && wms == releases[0]['flavors'][i]['wm_id'] && itypes == releases[0]['flavors'][i]['itype_id'] && dtypes == releases[0]['flavors'][i]['dtype_id']) {
			jQuery('#offsec-download-filename').val(releases[0]['flavors'][i]['filename']);
			jQuery('#offsec-download-file_md5').val(releases[0]['flavors'][i]['file_md5']);
			jQuery('#offsec-download-filesize').val(releases[0]['flavors'][i]['filesize']);
		}
	};
}

function offsecDownloadNoThanksDownload(rel_id)
{
	jQuery('#offsec-download-user-registered-' + rel_id).val('false');
	jQuery('#offsec-download-register-' + rel_id).slideUp();
	jQuery('#offsec-download-pick-flavor-' + rel_id).slideDown();
	return false;
}

function offsecDownloadRegisterThanDownload(rel_id)
{
	var name	= jQuery('#offsec-download-register-name-' + rel_id).val();
	var email	= jQuery('#offsec-download-register-email-' + rel_id).val();
	var country = jQuery('#offsec-download-register-country-' + rel_id).val();
	var fla_id = 0;
	var errors = new Array();
	if (name.length == 0) {
		errors[errors.length] = 'Please enter your name!';
	}
	if (email.length == 0) {
		errors[errors.length] = 'Please enter your email address!';
	}
	if (country.length == 0) {
		errors[errors.length] = 'Please enter your country!';
	}
	if (errors.length > 0) {
		var message = '';
		for (var i = 0; i< errors.length; i++)
		{
			message = message + errors[i] + "\n";
		}
		alert(message);
		return false;
	}
	var step = jQuery('#offsec-download-user-registered-' + rel_id).val();
	if (step == 'downloaded') {
		fla_id =  jQuery('#downloaded_fla_id-' + rel_id).val();
	}
	
	jQuery.ajax({
		url: ajaxurl,
		type: 'POST',
		data:  {'action': 'offsec_download_saveSubscriber', 'fla_id': fla_id, 'name': name, 'email': email, 'country': country},
		dataType: 'json',
		beforeSend: function ( xhr ) {
			//jQuery('#ajax-throbber-' + type).removeClass('hidden');
		},
		complete: function ( xhr) {
			//jQuery('#ajax-throbber-' + type).addClass('hidden');
		},
		success:function(response){
			if (response.status == 1) {
				if (step == 'downloaded') {
					jQuery('#offsec-download-register-' + rel_id + ' p.text-container').text('Thank you for registering.');
				} else {
					jQuery('#offsec-download-user-registered-' + rel_id).val('true');
					jQuery('#offsec-download-register-' + rel_id).slideUp();
					jQuery('#offsec-download-pick-flavor-' + rel_id).slideDown(400, function (){
						jQuery('#offsec-download-pick-flavor-' + rel_id + ' p.text-container').text('Thank you for registering. Please pick your flavor:');
					});
				}
				
			} else {
				alert(response.message);
			}
          }
	});
	return;
}

function offsecDownloadStartDownload(rel_id)
{
	var downloading_file = '';
	var fla_id = 0;
	
	var ars		= jQuery('#offsec-download-architecture').val();
	var wms		= jQuery('#offsec-download-wm').val();
	var itypes  = jQuery('#offsec-download-itype').val();
	var dtypes	= jQuery('#offsec-download-dtype').val();
	
	var total_flavors = releases[0]['flavors'].length;
	for (var i = 0; i < total_flavors; i++)
	{		
		if (ars == releases[0]['flavors'][i]['pla_id'] && 
			wms == releases[0]['flavors'][i]['wm_id'] && 
			itypes == releases[0]['flavors'][i]['itype_id'] && 
			dtypes == releases[0]['flavors'][i]['dtype_id'])  
		{
			downloading_file = releases[0]['flavors'][i]['filename'];
			fla_id = releases[0]['flavors'][i]['fla_id'];
			break;
		}
	};
	
	var randomnumber=Math.floor(Math.random()*mirrors.length);
	var downloading_path = mirrors[randomnumber]['path'] + downloading_file;
	
	jQuery.ajax({
		url: ajaxurl,
		type: 'POST',
		data:  {'action': 'offsec_download_countDownload', 'rel_id': rel_id, 'fla_id': fla_id},
		dataType: 'json',
		beforeSend: function ( xhr ) {
			//jQuery('#ajax-throbber-' + type).removeClass('hidden');
		},
		complete: function ( xhr) {
			//jQuery('#ajax-throbber-' + type).addClass('hidden');
		},
		success:function(response){
			var registered = jQuery('#offsec-download-user-registered-' + rel_id).val();
			if (registered != 'true') {
				jQuery('#downloaded_fla_id-' + rel_id).val(fla_id);
				jQuery('#offsec-download-register-' + rel_id).slideDown();
				jQuery('#offsec-download-pick-flavor-' + rel_id).slideUp();
				jQuery('#offsec-download-register-' + rel_id + ' p.text-container').text('Last chance to register and stay up to date!');
				jQuery('#offsec-download-register-' + rel_id + ' li.button input').val('Register');
				jQuery('#offsec-download-register-' + rel_id + ' li.no-thanks-just-download').remove();
				jQuery('#offsec-download-user-registered-' + rel_id).val('downloaded');
			}
			alert(downloading_path);
          }
	});
	return false;
}