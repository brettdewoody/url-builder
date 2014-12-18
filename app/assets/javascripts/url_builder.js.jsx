define(['react', 'components/core'], function (React, Core) {

  var fields = {
      url: {type: 'url', label: 'What URL do you want to send people to?*', placeholder: 'Enter URL', desc: 'This will be the base of your URL.' },
      campaignMedium: {type: 'text', label: 'Campaign Medium*', placeholder: 'Campaign Medium', desc: 'This is the channel the link is being used in. Use broad categories like email, social, or PPC.'},
      campaignSource: {type: 'text', label: 'Campaign Source*', placeholder: 'Campaign Source', desc: 'What\'s the specific place that you’ll be using this link? For example, “email” is too broad for this one, use the name of your email list like “Newsletter” or “Customer List”.'},
      campaignName: {type: 'text', label: 'Campaign Name*', placeholder: 'Campaign Name', desc: 'Use any name you want. It should be the name of your entire marketing campaign. This way, you can look at all the links from this campaign even if you use them in different places and channels.'},
      campaignContent: {type: 'text', label: 'Campaign Content (optional)', placeholder: 'Campaign Content', desc: 'If you use a bunch of links all in the same spot and all the fields above are identical, you can use this field to add more detail. For example, one link might be “header” while your second link is “footer.”'},
      campaignTerm: {type: 'text', label: 'Campaign Term (optional)', placeholder: 'Campaign Term', desc: 'If you’re using this link for search ads and also want to track the search term you’re running your ad on, add a campaign term.'}
    };

  var Link = React.createClass({

    shouldComponentUpdate: function(newProps, newState) {
      return true;
    },

    render: function() {
      var baseURL = this.props.params['url'];
      delete this.props.params['url'];
      var taggedURL = baseURL + '?' + this.serialize(this.props.params)

      return <div className="text-center small-12 medium-11 medium-centered columns">
          <h2>Copy and paste your campaign link!</h2>
          <div className="row collapse">
            <div className="small-12 medium-6 large-8 columns">
              <input type="text" defaultValue={taggedURL} value={taggedURL} readOnly />
            </div>
            <div className="small-12 medium-6 large-4 columns">
              <button className="button postfix" onClick={this.copy}>Copy Link to Clipboard</button>
            </div>
          </div>
        </div>
    },

    copy: function(){
      alert('Your URL has been copied to the clipboard. Not really, but it should be. I was going to use ZeroClipboard but ran out of time.');
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

  return React.createClass({

    getInitialState: function() {
      return {errors: {}}
    },

    render: function () {
      return <div className="url-builder-content">
        <div className="row">
          <div className="small-12 medium-6 columns">
            {this.renderTextInput('url', fields.url)}
          </div>
          <div className="small-12 medium-6 columns">
            {this.renderTextInput('campaignMedium', fields.campaignMedium)}
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 columns">
            {this.renderTextInput('campaignSource', fields.campaignSource)}
          </div>
          <div className="small-12 medium-6 columns">
            {this.renderTextInput('campaignName', fields.campaignName)}
          </div>
        </div>
        <div className="row">
          <div className="small-12 columns">
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 columns">
            {this.renderTextInput('campaignContent', fields.campaignContent)}
          </div>
          <div className="small-12 medium-6 columns">
            {this.renderTextInput('campaignTerm', fields.campaignTerm)}
          </div>
        </div>
        <div className="row submit">
          <div className="small-12 medium-6 columns small-text-center medium-text-left">
            <sup>*</sup>Required field.
          </div>
          <div className="small-12 medium-6 columns small-text-center medium-text-right">
            <button className="button radius" type="submit" onClick={this.handleSubmit}>Build My Link!</button>
          </div>
        </div>
      </div>;
    },

    renderTextInput: function(id, field) {
      return this.renderField(id, field)
    },

    renderField: function(id, field) {
      return <div className={this.hasError('form-group', {'has-error': id in this.state.errors})}>
        <label htmlFor={id} className="control-label">{field.label}</label>
        <p>{field.desc}</p>
        <input type="text" className="form-control" placeholder={field.placeholder} id={id} ref={id}/>
      </div>
    },

    handleSubmit: function() {
      if (this.isValid()) {
        React.render(<Link params={this.getFormData()} />, document.getElementById('link'))
      }
    },

    isValid: function() {

      var fields = ['campaignMedium', 'campaignSource', 'campaignName'];
      var errors = {};
      var flag = 1;

      var isValidURL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
      if (!isValidURL.test(this.trim(this.refs['url'].getDOMNode().value))) {
        errors['url'] = 'This field is required and must be a valid URl';
        this.refs['url'].getDOMNode().focus();
        flag++;
      }

      fields.forEach(function(field) {
        var value = this.trim(this.refs[field].getDOMNode().value);
        if (!value) {
          if (flag === 1){
             this.refs[field].getDOMNode().focus();
            flag ++;
          }
          errors[field] = 'This field is required';
        }
      }.bind(this));
      this.setState({errors: errors});
      var isValid = true;
      for (var error in errors) {
        isValid = false;
        break;
      }

      return isValid;
    },

    getFormData: function() {
      var data = {};
      data = {
        url: this.refs.url.getDOMNode().value,
        campaignMedium: this.refs.campaignMedium.getDOMNode().value,
        campaignSource: this.refs.campaignSource.getDOMNode().value,
        campaignName: this.refs.campaignName.getDOMNode().value,
        campaignContent: this.refs.campaignContent.getDOMNode().value,
        campaignTerm: this.refs.campaignTerm.getDOMNode().value
      };
      return data;
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
    },

    componentDidMount: function(){
      this.refs.url.getDOMNode().focus();
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }

  });
});
