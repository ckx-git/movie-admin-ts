import React from "react";
import { IMovieState } from "../redux/reducers/MovieReducer";
import { Switch, Table } from 'antd'
import { ColumnProps } from "antd/lib/table";
import { IMovie } from "../services/MovieService";
import defaultposterImg from '../assets/defaultposter.png'
import { SwitchType } from "../services/CommonTypes";

export interface IMovieTableEvents {
  onLoad: () => void
  onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void

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

    ]
  }
  render() {
    return (
      <Table
        rowKey="_id"
        dataSource={this.props.data}
        columns={this.getColumns()}
      ></Table>
    )
  }
}