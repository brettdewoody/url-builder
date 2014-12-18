define(['react', 'components/core'], function (React, Core) {

  var fields = {
      url: {type: 'text', label: 'What URL do you want to send people to?*' },
      campaignMedium: {type: 'text', label: 'Campaign Medium*'},
      campaignSource: {type: 'text', label: 'Campaign Source*'},
      campaignName: {type: 'text', label: 'Campaign Name*'},
      campaignContent: {type: 'text', label: 'Campaign Content (optional)'},
      campaignTerm: {type: 'text', label: 'Campaign Term (optional)'}
    };

  var Link = React.createClass({

    render: function() {

      var baseURL = this.props.params['url'];
      delete this.props.params['url'];

      return <div className="text-center small-12 columns">
          <h2>Copy and paste your campaign link!</h2>
          <div className="row">
            <div className="small-12 medium-6 large-8 columns">
              <input type="text" defaultValue={baseURL + '?' + this.serialize(this.props.params)} />
            </div>
            <div className="small-12 medium-6 large-4 columns">
              <button>Copy Link to Clipboard</button>
            </div>
          </div>

        </div>
    },

    serialize: function(obj) {
      var str = [];
      for(var p in obj)
        if (obj.hasOwnProperty(p) && obj[p] !== '') {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return str.join("&");
    }

  });

  return Form = React.createClass({

    getInitialState: function() {
      return {errors: {}}
    },

    render: function () {
      return <div className="url-builder-content">
        <div className="row">
          <div className="small-12 large-6 columns">
            {this.renderTextInput('url', fields.url.label)}
          </div>
          <div className="small-12 large-6 columns">
            {this.renderTextInput('campaignMedium', fields.campaignMedium.label)}
          </div>
        </div>
        <div className="row">
          <div className="small-12 large-6 columns">
            {this.renderTextInput('campaignSource', fields.campaignSource.label)}
          </div>
          <div className="small-12 large-6 columns">
            {this.renderTextInput('campaignName', fields.campaignName.label)}
          </div>
        </div>
        <div className="row">
          <div className="small-12 large-6 columns">
            {this.renderTextInput('campaignContent', fields.campaignContent.label)}
          </div>
          <div className="small-12 large-6 columns">
            {this.renderTextInput('campaignTerm', fields.campaignTerm.label)}
          </div>
        </div>
        <div className="row">
          <div className="small-12 columns text-right">
            <button type="submit" onClick={this.handleSubmit}>Build My Link!</button>
          </div>
        </div>
      </div>;
    },

    renderTextInput: function(id, label) {
      return this.renderField(id, label,
        <Core.TextInput type="text" className="form-control" id={id} ref={id}/>
      )
    },

    renderField: function(id, label, field) {
      return <div className={this.hasError('form-group', {'has-error': id in this.state.errors})}>
        <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
        <div className="col-sm-6">
          {field}
        </div>
      </div>
    },

    handleSubmit: function() {
      if (this.isValid()) {
        React.render(<Link params={this.getFormData()} />, document.getElementById('link'))
      }
    },

    isValid: function() {

      var fields = ['url', 'campaignMedium', 'campaignSource', 'campaignName']

      var errors = {}
      fields.forEach(function(field) {
        var value = this.trim(this.refs[field].getDOMNode().value);
        if (!value) {
          errors[field] = 'This field is required'
        }
      }.bind(this))
      this.setState({errors: errors});

      var isValid = true;
      for (var error in errors) {
        isValid = false;
        break;
      }

      return isValid;
    },

    getFormData: function() {
      var data = {
        url: this.refs.url.getDOMNode().value,
        campaignMedium: this.refs.campaignMedium.getDOMNode().value,
        campaignSource: this.refs.campaignSource.getDOMNode().value,
        campaignName: this.refs.campaignName.getDOMNode().value,
        campaignContent: this.refs.campaignContent.getDOMNode().value,
        campaignTerm: this.refs.campaignTerm.getDOMNode().value
      }
      return data
    },

    trim:  function(string) {
      var TRIM_RE = /^\s+|\s+$/g
      return string.replace(TRIM_RE, '');
    },

    hasError: function(baseClass, errorClass) {
      var classNames = [];
      if (typeof errorClass == 'undefined') {
        errorClass = baseClass;
      }
      else {
        classNames.push(baseClass);
      }
      for (var className in errorClass) {
        if (!!errorClass[className]) {
          classNames.push(className);
        }
      }
      return classNames.join(' ');
    }

  });
});
