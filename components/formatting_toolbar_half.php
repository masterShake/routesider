
<!-- formatting -->
<div class="formatting">
	<!-- format text -->
	<div style="height:42px;">
		<div class="btn-group">
			<button type="button" class="btn btn-default" data-front="&#42;&#42;" data-rear="&#42;&#42;" aria-label="bold"><span class="glyphicon glyphicon-bold" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="&#42;" data-rear="&#42;" aria-label="italic"><span class="glyphicon glyphicon-italic" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="&#126;&#126;" data-rear="&#126;&#126;" aria-label="strike through"><span class="icon-strikethrough" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="&#94;&#40;" data-rear="&#41;" aria-label="super-script"><span class="glyphicon glyphicon-superscript" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="&#45;&#94;&#40;" data-rear="&#41;" aria-label="sub-script"><span class="glyphicon glyphicon-subscript" aria-hidden="true"></span></button>
		</div>
	</div>
	<!-- toggle instructions table -->
	<div style="text-align:right;padding-bottom:5px;">
		<a href="#" class="toggle-formatting-table" data-toggled="0">markdown formatting&nbsp;<span class="glyphicon glyphicon-triangle-bottom"></span></a>
	</div>
	<!-- formatting instructions table -->
	<table>
		<thead>
			<tr>
				<th><span class="glyphicon glyphicon-font"></span>&nbsp;input&#58;</th>
				<th><span class="glyphicon glyphicon-eye-open"></span>&nbsp;output&#58;</th>
			</tr>
		</thead>
		<tbody>
			<!-- bold -->
			<tr>
				<td>**bold**</td>
				<td><strong>bold</strong></td>
			</tr>
			<!-- italic -->
			<tr>
				<td>*italic*</td>
				<td><i>italic</i></td>
			</tr>
			<!-- strike -->
			<tr>
				<td>~~strike~~</td>
				<td><span class="strike">strike</span></td>
			</tr>
			<!-- super script -->
			<tr>
				<td>X^(2)</td>
				<td>X<sup>2</sup></td>
			</tr>
			<!-- sub script -->
			<tr>
				<td>X-^(2)</td>
				<td>X<sub>2</sub></td>
			</tr>
		</tbody>
	</table>
</div><!-- /formatting -->