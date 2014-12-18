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
      return <div>
          Your link
        </div>
      // var submitted
      // if (this.state.submitted !== null) {
      // }
    }

  });

  return React.createClass({

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
      return <div className="">
        <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
        <div className="col-sm-6">
          {field}
        </div>
      </div>
    },

    handleSubmit: function() {
      if (this.isValid()) {
        this.setState({submitted: this.getFormData()});
        React.render(<Link />, document.getElementById('link'))
      }
    },

    isValid: function() {
      var fields = ['url', 'campaignMedium', 'campaignSource', 'campaignName']

      var errors = {}
      fields.forEach(function(field) {
        var value = this.trim(this.refs[field].getDOMNode().value)
        if (!value) {
          errors[field] = 'This field is required'
        }
      }.bind(this))
      this.setState({errors: errors})

      var isValid = true
      for (var error in errors) {
        isValid = false
        break
      }

      return isValid
    },

    getFormData: function() {
      var data = {
        url: this.refs.url.getDOMNode().value,
        campaignMedium: this.refs.campaignMedium.getDOMNode().value,
        campaignSource: this.refs.campaignSource.getDOMNode().value,
        campaignName: this.refs.campaignName.getDOMNode().value
      }
      return data
    },

    trim: function() {
      var TRIM_RE = /^\s+|\s+$/g
      return function trim(string) {
        return string.replace(TRIM_RE, '')
      }
    }
  });
});
