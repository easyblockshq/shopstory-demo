import styles from './productListing.module.css'
import React, { FC, useEffect, useRef, useState } from 'react'
import { CollectionFilter, CollectionFilterOption, FilterButtonType, PLPProps } from '../../../types'
import ProductCard from '../../common/ProductCard/ProductCard'
import Router, { useRouter } from 'next/router'
import { buildHandle, decomposeHandle } from '../../../utils/collectionsHandle'
import { Modal } from '../../common/Modal/Modal'
import { Button } from '../../common/Button/Button'
import { filterCollection, getCollectionColor } from '../../../data/shopify/filterCollection'
import { Appearance } from '../../common/StyledClickable/StyledClickable'

const getActiveFiltersCount = (activeFilters: any) => {
  let counter = 0

  if (activeFilters?.material) {
    counter = counter + activeFilters.material.length
  }
  if (activeFilters?.room) {
    counter = counter + activeFilters.room.length
  }
  return counter
}

const ProductListing: FC<PLPProps> = (props) => {
  const router = useRouter()
  const query: any = router.query
  const isFirstRender = useRef(true)

  const { handle, values } = decomposeHandle(query.handle)

  const fullHandle = buildHandle(handle, values)

  const [activeFilters, setActiveFilters] = useState(values ?? {})
  const [collection, setCollection] = useState(props.collection)
  const [pagination, setPagination] = useState(props.pagination)

  const activeFiltersCount = getActiveFiltersCount(activeFilters)

  const onChange = (newFilters: any) => {
    setActiveFilters(newFilters)
    const newFullHandle = buildHandle(handle, newFilters)
    Router.push(`/category/[handle]`, `/category/${newFullHandle}`, {
      shallow: true
    })
  }

  const toggleFilter = (id: string, optionId: string, type: FilterButtonType) => {
    let newFilters = values

    if (type === 'select') {
      newFilters[id] = [optionId]
    }

    if (type === 'multiselect' || type === 'colorselect') {
      if (!newFilters[id]) {
        newFilters[id] = []
      }

      if (newFilters[id].includes(optionId)) {
        newFilters[id].splice(newFilters[id].indexOf(optionId), 1)
      } else {
        newFilters[id].push(optionId)
      }
    }

    onChange(newFilters)
  }

  // console.log('xxxxx01')
  // console.log(values)
  // console.log(activeFilters)
  // console.log(fullHandle)
  // console.log(activeFiltersCount)

  const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false)
  const toggleFilterModal = () => {
    setFilterModalOpen(!isFilterModalOpen)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const result = filterCollection(props.fullCollection, { ...values })
    setTimeout(() => {
      setCollection(result.collection)
      setPagination(result.pagination)
      setActiveFilters(result.options)
    }, 100)
  }, [fullHandle]) // if query string changed, let's reload

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1 className={styles.title}>{props.collection.title}</h1>
          {props.collection.descriptionHtml && (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: props.collection.descriptionHtml }}
            />
          )}
        </div>
        <div className={styles.filtersContainer}>
          <Button appearance={'outlineBlack'} size={'medium'} onClick={toggleFilterModal}>
            Filter <span className={styles.counter}>{activeFiltersCount}</span>
          </Button>
        </div>
      </div>
      <div className={styles.productGrid}>
        {collection &&
          collection.products.length > 0 &&
          collection.products.map((product, i) => <ProductCard {...product} key={i} />)}
      </div>

      <Modal
        isOpen={isFilterModalOpen}
        onRequestClose={toggleFilterModal}
        variant={'transparent'}
        size={'stretch-y'}
        position={'right'}
      >
        <div className={`ReactModal__Animation--right ${styles.filters}`}>
          <div className={styles.modalHeader}>
            <span className={styles.modalHeading}>Filter</span>
            <Button onClick={toggleFilterModal}>Close</Button>
          </div>
          <div className={styles.modalContent}>
            {props.filters.map((filter: CollectionFilter, i: number) => {
              let filterBoxStyle = styles.sortBox
              let filtersStyle = styles.filterSelect
              let buttonAppearance: Appearance = 'radioButton'

              switch (filter.type) {
                case 'multiselect':
                  filterBoxStyle = styles.filterBox
                  filtersStyle = styles.filterMultiselect
                  buttonAppearance = 'checkboxButton'
                  break
                case 'colorselect':
                  filterBoxStyle = styles.filterBox
                  filtersStyle = styles.filterColorselect
                  buttonAppearance = 'colorButton'
                  break
              }

              return (
                <div className={filterBoxStyle} key={i}>
                  <div className={styles.filterHeading}>{filter.label}</div>

                  <div key={i} className={filtersStyle}>
                    {filter.options.map((option: CollectionFilterOption, j: number) => {
                      return (
                        <Button
                          key={j}
                          onClick={() => {
                            toggleFilter(filter.id, option.id, filter.type)
                          }}
                          appearance={buttonAppearance}
                          active={
                            values[filter.id] && values[filter.id].includes(option.id)
                              ? true
                              : !values[filter.id] && filter.type === 'select' && j === 0 //select the first item if empty
                              ? true
                              : false
                          }
                        >
                          {filter.type === 'colorselect' && (
                            <span
                              className={styles.colorInfo}
                              style={{ backgroundColor: getCollectionColor(option.id)?.hex }}
                            ></span>
                          )}
                          {option.label}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.modalFooter}>
            <Button appearance={'solidWhite'} onClick={toggleFilterModal}>
              Apply ({activeFiltersCount})
            </Button>
            <Button appearance={'solidGrey'} onClick={() => onChange({})}>
              Clear all
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProductListing
