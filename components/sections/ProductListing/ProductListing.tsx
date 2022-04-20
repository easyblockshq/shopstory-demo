import styles from './productListing.module.css'
import React, { FC, useEffect, useRef, useState } from 'react'
import {
  CollectionFilter,
  CollectionFilterOption,
  CollectionFilterButtonType,
  PLPProps,
  CollectionFilterValues
} from '../../../types'
import ProductCard from '../../common/ProductCard/ProductCard'
import Router, { useRouter } from 'next/router'
import { buildHandle, decomposeHandle } from '../../../utils/collectionsHandle'
import { Modal } from '../../common/Modal/Modal'
import { Button } from '../../common/Button/Button'
import { filterCollection, getCollectionColor } from '../../../data/shopify/filterCollection'
import { ToggleButton } from '../../common/ToggleButton/ToggleButton'
import { ToggleColorButton } from '../../common/ToggleColorButton/ToggleColorButton'
import { ToggleRadioButton } from '../../common/ToggleRadioButton/ToggleRadioButton'
import CloseIcon from '../../icons/CloseIcon'
import { shopstoryRuntimeConfig } from '../../../shopstory/shopstoryRuntimeConfig'
import { ShopstoryGrid } from '@shopstory/core/dist/client/Shopstory'

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
  const { query } = router
  const isFirstRender = useRef(true)

  const { handle, values } =
    query.handle && typeof query.handle == 'string' ? decomposeHandle(query.handle) : { handle: null, values: null }

  const fullHandle = buildHandle(handle, values)

  const [activeFilters, setActiveFilters] = useState(values ?? {})
  const [collection, setCollection] = useState(props.collection)
  const [pagination, setPagination] = useState(props.pagination)
  const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false)

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

  if (!handle && !values) {
    return null
  }

  const activeFiltersCount = getActiveFiltersCount(activeFilters)

  const onChange = (newFilters: any) => {
    setActiveFilters(newFilters)
    const newFullHandle = buildHandle(handle, newFilters)
    Router.push(`/category/[handle]`, `/category/${newFullHandle}`, {
      shallow: true
    })
  }

  const toggleFilter = (id: keyof CollectionFilterValues, optionId: string, type: CollectionFilterButtonType) => {
    let newFilters = JSON.parse(JSON.stringify(values))

    if (type === 'select') {
      newFilters[id] = [optionId]
    } else if (type === 'multiselect' || type === 'colorselect') {
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

  const toggleFilterModal = () => {
    setFilterModalOpen(!isFilterModalOpen)
  }

  const isFilterButtonActive = (filter: CollectionFilter, optionId: string, index: number) => {
    const filterValue = values[filter.id]

    if (!filterValue) {
      return false
    }

    if (Array.isArray(filterValue)) {
      return filterValue.includes(optionId)
    }

    return filterValue === optionId
  }

  const productCards = collection
    ? collection.products.map((product, i) => <ProductCard product={product} key={i} />)
    : []

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
        <ShopstoryGrid
          runtimeConfig={shopstoryRuntimeConfig}
          cards={productCards}
          src={props.shopstoryCompiledContent}
        />
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
            <Button onClick={toggleFilterModal}>
              <CloseIcon />
            </Button>
          </div>
          <div className={styles.modalContent}>
            {props.filters.map((filter: CollectionFilter, i: number) => {
              let filterBoxStyle = styles.sortBox

              return (
                <div className={filterBoxStyle} key={i}>
                  <div className={styles.filterHeading}>{filter.label}</div>

                  {filter.type === 'select' && (
                    <div key={i} className={styles.filterSelect}>
                      {filter.options.map((option: CollectionFilterOption, j: number) => (
                        <ToggleRadioButton
                          key={j}
                          onClick={() => {
                            toggleFilter(filter.id, option.id, filter.type)
                          }}
                          selected={isFilterButtonActive(filter, option.id, j)}
                        >
                          {option.label}
                        </ToggleRadioButton>
                      ))}
                    </div>
                  )}

                  {filter.type === 'multiselect' && (
                    <div key={i} className={styles.filterMultiselect}>
                      {filter.options.map((option: CollectionFilterOption, j: number) => (
                        <ToggleButton
                          key={j}
                          onClick={() => {
                            toggleFilter(filter.id, option.id, filter.type)
                          }}
                          selected={isFilterButtonActive(filter, option.id, j)}
                        >
                          {option.label}
                        </ToggleButton>
                      ))}
                    </div>
                  )}

                  {filter.type === 'colorselect' && (
                    <div key={i} className={styles.filterColorselect}>
                      {filter.options.map((option: CollectionFilterOption, j: number) => (
                        <ToggleColorButton
                          key={j}
                          onClick={() => {
                            toggleFilter(filter.id, option.id, filter.type)
                          }}
                          selected={isFilterButtonActive(filter, option.id, j)}
                          color={getCollectionColor(option.id)?.hex ?? 'black'}
                        >
                          {option.label}
                        </ToggleColorButton>
                      ))}
                    </div>
                  )}
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
