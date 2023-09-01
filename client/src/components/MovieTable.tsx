import React from "react";
import { IMovieState } from "../redux/reducers/MovieReducer";
import { Button, Popconfirm, Switch, Table, message } from 'antd'
import { ColumnProps, PaginationConfig } from "antd/lib/table";
import { IMovie } from "../services/MovieService";
import defaultposterImg from '../assets/defaultposter.png'
import { SwitchType } from "../services/CommonTypes";
import { NavLink } from "react-router-dom";

export interface IMovieTableEvents {
  onLoad: () => void
  onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void
  onDelete: (id: string) => Promise<void>
  onChange: (newPage: number) => void
}

export default class extends React.Component<IMovieState & IMovieTableEvents> {

  componentDidMount(): void {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  private getColumns(): ColumnProps<IMovie>[] {
    return [
      {
        title: '封面',
        dataIndex: 'poster',
        render: poster => {
          if (poster) {
            return <img className="tablePoster" src={poster} alt="" />
          } else {
            return <img className="tablePoster" src={defaultposterImg} alt="" />
          }
        }
      },
      { title: '名称', dataIndex: 'name' },
      {
        title: '地区',
        dataIndex: 'areas',
        render: (text: string[], record) => {
          return text.join(', ')
        }
      },
      {
        title: '类型',
        dataIndex: 'types',
        render: (text: string[], record) => {
          return text.join(', ')
        }
      },
      {
        title: '时长', dataIndex: 'timeLong',
        render(timeLong, record, index) {
          return timeLong + '分钟'
        },
      },
      {
        title: '正在热映', dataIndex: 'isHot',
        render: (isHot, record) => {
          return <Switch checked={isHot} onChange={newVal => {
            this.props.onSwitchChange(SwitchType.isHot, newVal, record._id!)
          }} />
        },
      },
      {
        title: '即将上映', dataIndex: 'isComing',
        render: (isComing, record) => {
          return <Switch checked={isComing} onChange={newVal => {
            this.props.onSwitchChange(SwitchType.isComing, newVal, record._id!)
          }} />
        },
      },
      {
        title: '经典影片', dataIndex: 'isClassic',
        render: (isClassic, record) => {
          return <Switch checked={isClassic} onChange={newVal => {
            this.props.onSwitchChange(SwitchType.isClassic, newVal, record._id!)
          }} />
        },
      },
      {
        title: '操作', dataIndex: '_id',
        render: (id: string) => {
          return <div>
            <NavLink to={'/movie/edit/' + id}>
              <Button type="primary" size="small">编辑</Button>
            </NavLink>
            <Popconfirm title="确定要删除吗" onConfirm={ async () => {
              await this.props.onDelete(id)
              message.success('删除成功')
            }} okText="确定" cancelText="取消">
              <Button type="danger" size="small">删除</Button>
            </Popconfirm>
          </div>
        },
      },
    ]
  }

  getPageConfig(): PaginationConfig | false {
    if (this.props.total === 0) {
      return false
    }
    return {
      current: this.props.condition.page,
      pageSize: this.props.condition.limit,
      total: this.props.total
    }
  }

  handleChange(pagination: PaginationConfig) {
    this.props.onChange(pagination.current!)
  }

  render() {
    return (
      <Table
        rowKey="_id"
        dataSource={this.props.data}
        columns={this.getColumns()}
        pagination={this.getPageConfig()}
        onChange={this.handleChange.bind(this)}
        loading={this.props.isLoading}
      ></Table>
    )
  }
}