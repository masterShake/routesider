
<!-- formatting -->
<div class="formatting">
	<!-- toolbar -->
	<div class="btn-toolbar" role="toolbar">
		<!-- format text -->
		<div class="btn-group">
			<button type="button" class="btn btn-default" data-front="&#42;&#42;" data-rear="&#42;&#42;" aria-label="bold"><span class="glyphicon glyphicon-bold" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="&#42;" data-rear="&#42;" aria-label="italic"><span class="glyphicon glyphicon-italic" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="&#126;&#126;" data-rear="&#126;&#126;" aria-label="strike through"><span class="icon-strikethrough" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="&#94;&#40;" data-rear="&#41;" aria-label="super-script"><span class="glyphicon glyphicon-superscript" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="&#45;&#94;&#40;" data-rear="&#41;" aria-label="sub-script"><span class="glyphicon glyphicon-subscript" aria-hidden="true"></span></button>
		</div>
		<!-- format layout -->
		<div class="btn-group">
			<button type="button" class="btn btn-default" data-front="&#91;" data-rear="&#93;&#40;&#41;" aria-label="insert web link"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="1&#46;&nbsp;" data-rear="&#10;" aria-label="numbered list"><span class="icon-list-numbered" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="&#10;&#42;&nbsp;" data-rear="&#10;" aria-label="bullet point list"><span class="icon-list2" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="&#10;&#62;&nbsp;" data-rear="" aria-label="quoted text"><span class="icon-quotes-left" aria-hidden="true"></span></button>
			<button type="button" class="btn btn-default" data-front="&#10;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#10;" data-rear="" aria-label="insert divider"><span class="icon-page-break" aria-hidden="true"></span></button>
		</div>
	</div>
	<!-- toggle instructions table -->
	<div class="toggle-links">
		<a href="#" data-toggled="0" style="float:right;">markdown formatting&nbsp;<span class="glyphicon glyphicon-triangle-bottom"></span></a>
		<a href="#" data-toggled="0">preview&nbsp;<span class="glyphicon glyphicon-triangle-bottom"></span></a>
	</div>
	<!-- markdown preview -->
	<div class="well" style="display:none;">
		<div style="text-align:center;font-size:16px;color:#5cb85c;">
			<span class="glyphicon glyphicon-hourglass loading"></span>
		</div>
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
			<!-- link -->
			<tr>
				<td>&#91;routesider&#93;&#40;https&#58;&#47;&#47;routesider.com&#47;&#41;</td>
				<td><a href="">routesider</a></td>
			</tr>
			<!-- ordered list -->
			<tr>
				<td>1. milk<br>2. bread<br>3. cheese</td>
				<td>
					<ol>
						<li>milk</li>
						<li>bread</li>
						<li>cheese</li>
					</ol>
				</td>
			</tr>
			<!-- unordered list -->
			<tr>
				<td>* milk<br>* bread<br>* cheese</td>
				<td>
					<ul>
						<li>milk</li>
						<li>bread</li>
						<li>cheese</li>
					</ul>
				</td>
			</tr>
			<!-- quote -->
			<tr>
				<td>&#62;&nbsp;quote</td>
				<td><q>quote</q></td>
			</tr>
			<!-- divider -->
			<tr style="border-bottom:0px;">
				<td>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</td>
				<td><hr style="margin-top:10px;margin-bottom:10px;"></td>
			</tr>
		</tbody>
	</table>
</div><!-- /formatting -->