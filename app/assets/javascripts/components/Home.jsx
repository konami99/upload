class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      people: null,
      sortOrder: "ascending"
    }

    this.upload = this.upload.bind(this)
    this.getPeopleList = this.getPeopleList.bind(this)
    this.sort = this.sort.bind(this)
  }

  componentDidMount() {
    this.getPeopleList()
  }

  upload(event) {
    event.preventDefault()
    var fileSelect = document.getElementById("myfile");
    var files = fileSelect.files;
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append('csv', file, file.name);
    }
    fetch("/upload.json", {
      method: "post",
      body: formData
    }).then((response) => {
      if (response.status === 200) {
        this.getPeopleList()
      }
    })
  }

  getPeopleList() {
    this.setState({people: null})
    fetch("/people.json", {
      method: "get",
    }).then((response) => {
      response.json().then((data) => {
        this.setState({people: data})
      })
    })
  }

  sort(event) {
    var sortBy = event.currentTarget.getAttribute("data-column")
    sortedPeople = this.state.people.sort((a, b) => {
      var nameA = a[sortBy]
      var nameB = b[sortBy]
      if (this.state.sortOrder === "ascending") {
        if (nameA < nameB) {
          return 1
        }
        if (nameA > nameB) {
          return -1
        }
        return 0
      } else {
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      }
    })

    this.setState({people: sortedPeople})
    if (this.state.sortOrder === "ascending") {
      this.setState({sortOrder: "descending"})
    } else {
      this.setState({sortOrder: "ascending"})
    }
  }

  renderTable() {
    if (this.state.people && this.state.people.length) {
      return <table className="table table-striped">
        <thead>
          <tr>
            <th data-column="name" onClick={ this.sort }>Name</th>
            <th>Birthday</th>
            <th data-column="number" onClick={ this.sort }>Number</th>
            <th data-column="description" onClick={ this.sort }>Description</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.people.map((person) => {
            return <tr key={ person.id }>
              <td>{ person.name }</td>
              <td>{ person.birthday }</td>
              <td>{ person.number }</td>
              <td>{ person.description }</td>
            </tr>
          })
        }
        </tbody>
      </table>
    }
  }

  render() {
    return <div className="container">
      <div className="row">
        <div className="col-0 col-md-3"></div>
        <div className="col-12 col-md-6">
          <div className="page-header">
            <h1>Upload file</h1>
          </div>
          <form className="form-group" id="task-form" encType="multipart/form-data" method="post" action="/upload" onSubmit={ this.upload }>
            <div className="form-group">
              <input id="myfile" name="myfile" type="file" />
            </div>
            <input type="submit" className="btn btn-primary" value="submit" />
          </form>
          { this.renderTable() }
        </div>
        <div className="col-0 col-md-3"></div>
      </div>
    </div>
  }
}
