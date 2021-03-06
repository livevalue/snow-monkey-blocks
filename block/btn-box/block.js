'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, BaseControl, TextControl, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/btn-box', {
	title: __( 'Button box', 'snow-monkey-blocks' ),
	icon: 'embed-generic',
	category: 'smb',
	attributes: {
		lede: {
			type: 'array',
			source: 'children',
			selector: '.smb-btn-box__lede',
			default: [],
		},
		note: {
			type: 'array',
			source: 'children',
			selector: '.smb-btn-box__note',
			default: [],
		},
		backgroundColor: {
			type: 'string',
			default: null,
		},
		btnLabel: {
			type: 'array',
			source: 'children',
			selector: '.smb-btn__label',
			default: [ __( 'Button', 'snow-monkey-blocks' ) ],
		},
		btnURL: {
			type: 'string',
			default: '',
		},
		btnTarget: {
			type: 'string',
			default: '_self',
		},
		btnBackgroundColor: {
			type: 'string',
			default: null,
		},
		btnTextColor: {
			type: 'string',
			default: null,
		},
		btnSize: {
			type: 'string',
			default: null,
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { lede, note, backgroundColor, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, btnSize } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Button box Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Button Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'URL', 'snow-monkey-blocks' ) }
							value={ btnURL }
							onChange={ ( value ) => setAttributes( { btnURL: value } ) }
						/>

						<SelectControl
							label={ __( 'Target', 'snow-monkey-blocks' ) }
							value={ btnTarget }
							onChange={ ( value ) => setAttributes( { btnTarget: value } ) }
							options={ [
								{
									value: '_self',
									label: __( '_self', 'snow-monkey-blocks' ),
								},
								{
									value: '_blank',
									label: __( '_blank', 'snow-monkey-blocks' ),
								},
							] }
						/>

						<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ btnBackgroundColor }
								onChange={ ( value ) => setAttributes( { btnBackgroundColor: value } ) }
							/>
						</BaseControl>

						<BaseControl label={ __( 'Text Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ btnTextColor }
								onChange={ ( value ) => setAttributes( { btnTextColor: value } ) }
							/>
						</BaseControl>

						<SelectControl
							label={ __( 'Button size', 'snow-monkey-blocks' ) }
							value={ btnSize }
							onChange={ ( value ) => setAttributes( { btnSize: value } ) }
							options={ [
								{
									value: '',
									label: __( 'Normal button', 'snow-monkey-blocks' ),
								},
								{
									value: 'full',
									label: __( 'Full button', 'snow-monkey-blocks' ),
								},
							] }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="smb-btn-box" style={ { backgroundColor: backgroundColor } }>
					<div className="c-container">
						{ ( lede.length > 0 || isSelected ) &&
							<RichText
								className="smb-btn-box__lede"
								value={ lede }
								onChange={ ( value ) => setAttributes( { lede: value } ) }
								formattingControls={ [] }
								placeholder={ __( 'Write lede...', 'snow-monkey-blocks' ) }
							/>
						}

						<div className="smb-btn-box__btn-wrapper">
							<span
								className={ classnames( 'smb-btn', { [ `smb-btn--${ btnSize }` ]: !! btnSize } ) } href={ btnURL } target={ btnTarget }
								style={ { backgroundColor: btnBackgroundColor } }
							>
								<RichText
									className="smb-btn__label"
									value={ btnLabel }
									placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
									onChange={ ( value ) => setAttributes( { btnLabel: value } ) }
									style={ { color: btnTextColor } }
									formattingControls={ [] }
								/>
							</span>
						</div>

						{ ( note.length > 0 || isSelected ) &&
							<RichText
								className="smb-btn-box__note"
								value={ note }
								onChange={ ( value ) => setAttributes( { note: value } ) }
								formattingControls={ [] }
								placeholder={ __( 'Write note...', 'snow-monkey-blocks' ) }
							/>
						}
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { lede, note, backgroundColor, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, btnSize } = attributes;

		return (
			<div className="smb-btn-box" style={ { backgroundColor: backgroundColor } }>
				<div className="c-container">
					{ lede.length > 0 &&
						<div className="smb-btn-box__lede">
							{ lede }
						</div>
					}

					<div className="smb-btn-box__btn-wrapper">
						<a
							className={ classnames( 'smb-btn', { [ `smb-btn--${ btnSize }` ]: !! btnSize } ) } href={ btnURL } target={ btnTarget }
							style={ { backgroundColor: btnBackgroundColor } }
						>
							<span className="smb-btn__label" style={ { color: btnTextColor } }>
								{ btnLabel }
							</span>
						</a>
					</div>

					{ note.length > 0 &&
						<div className="smb-btn-box__note">
							{ note }
						</div>
					}
				</div>
			</div>
		);
	},

	deprecated: [
		{
			attributes: {
				lede: {
					type: 'array',
					source: 'children',
					selector: '.smb-btn-box__lede',
					default: [],
				},
				note: {
					type: 'array',
					source: 'children',
					selector: '.smb-btn-box__note',
					default: [],
				},
				backgroundColor: {
					type: 'string',
					default: null,
				},
				btnLabel: {
					type: 'array',
					source: 'children',
					selector: '.smb-btn__label',
					default: [ __( 'Button', 'snow-monkey-blocks' ) ],
				},
				btnURL: {
					type: 'string',
					default: '',
				},
				btnTarget: {
					type: 'string',
					default: '_self',
				},
				btnBackgroundColor: {
					type: 'string',
					default: null,
				},
				btnTextColor: {
					type: 'string',
					default: null,
				},
			},

			save( { attributes } ) {
				const { lede, note, backgroundColor, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor } = attributes;

				const btnBoxStyle = {};
				if ( !! backgroundColor && 'null' !== backgroundColor ) {
					btnBoxStyle.backgroundColor = backgroundColor;
				}

				const btnStyle = {};
				if ( !! btnBackgroundColor && 'null' !== btnBackgroundColor ) {
					btnStyle.btnBackgroundColor = btnBackgroundColor;
				}

				const btnLabelStyle = {};
				if ( !! btnTextColor && 'null' !== btnTextColor ) {
					btnLabelStyle.btnTextColor = btnTextColor;
				}

				return (
					<div className="smb-btn-box" style={ btnBoxStyle }>
						<div className="c-container">
							{ lede.length > 0 &&
								<div className="smb-btn-box__lede">
									{ lede }
								</div>
							}

							<a
								className="smb-btn smb-btn--full" href={ btnURL } target={ btnTarget } style={ btnStyle }>
								<span className="smb-btn__label" style={ btnLabelStyle }>
									{ btnLabel }
								</span>
							</a>

							{ note.length > 0 &&
								<div className="smb-btn-box__note">
									{ note }
								</div>
							}
						</div>
					</div>
				);
			},
		},
	],
} );
