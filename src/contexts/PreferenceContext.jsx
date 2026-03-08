import { createContext, useContext, useEffect, useState } from 'react'
import { paymentMethods } from '../utils/helper'

const PreferenceContext = createContext()
const PREFERENCE_STORAGE_KEY = 'user_preferences'
const defaultAddresses = [
        {
                id: 'andrew',
                shipping: {
                        name: 'Andrew',
                        phone: '(+60) 12-345 6789',
                        address:
                                'Ground Floor, Bangunan Tan Sri Khaw Kai Boh (Block A), Jalan Genting Kelang, Setapak, 53100 Kuala Lumpur, Federal Territory of Kuala Lumpur',
                        unitNo: '',
                        postalCode: '53100',
                },
                isDefault: true,
        },
        {
                id: 'kong',
                shipping: {
                        name: 'Kong Ji Shou',
                        phone: '(+60) 14-350 3255',
                        address:
                                '19, Jalan Kampung Wira Jaya, Taman Melati, 53300 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
                        unitNo: '',
                        postalCode: '53300',
                },
                isDefault: false,
        },
]

function buildInitialPreferences() {
        const initialDefaultAddressId = defaultAddresses.find((item) => item.isDefault)?.id || defaultAddresses[0]?.id || null

        return {
                defaultPaymentMethod: 'maybank',
                defaultAddressId: initialDefaultAddressId,
                addresses: defaultAddresses,
        }
}

function normalizeAddress(address) {
        if (!address) return null

        const normalizedId = address.id || `addr-${Date.now()}`
        const incomingShipping = address.shipping || {
                name: address.name || '',
                phone: address.phone || '',
                address: address.address || '',
                unitNo: address.unitNo || '',
                postalCode: address.postalCode || '',
        }

        return {
                id: normalizedId,
                shipping: {
                        name: incomingShipping.name || '',
                        phone: incomingShipping.phone || '',
                        address: incomingShipping.address || '',
                        unitNo: incomingShipping.unitNo || '',
                        postalCode: incomingShipping.postalCode || '',
                },
                isDefault: Boolean(address.isDefault),
        }
}

function ensureSingleDefaultAddress(addresses, preferredAddressId) {
        if (!Array.isArray(addresses) || addresses.length === 0) {
                return {
                        addresses: [],
                        defaultAddressId: null,
                }
        }

        const resolvedDefaultId =
                preferredAddressId && addresses.some((item) => item.id === preferredAddressId)
                        ? preferredAddressId
                        : addresses.find((item) => item.isDefault)?.id || addresses[0].id

        return {
                addresses: addresses.map((item) => ({
                        ...item,
                        isDefault: item.id === resolvedDefaultId,
                })),
                defaultAddressId: resolvedDefaultId,
        }
}

export function PreferenceProvider({ children }) {
        const [preferences, setPreferences] = useState(() => {
                try {
                        const savedPreferences = localStorage.getItem(PREFERENCE_STORAGE_KEY)

                        if (!savedPreferences) {
                                return buildInitialPreferences()
                        }

                        const parsed = JSON.parse(savedPreferences)
                        const defaultState = buildInitialPreferences()

                        const normalizedAddresses = Array.isArray(parsed.addresses)
                                ? parsed.addresses.map(normalizeAddress).filter(Boolean)
                                : defaultState.addresses

                        const { addresses, defaultAddressId } = ensureSingleDefaultAddress(
                                normalizedAddresses.length > 0 ? normalizedAddresses : defaultState.addresses,
                                parsed.defaultAddressId
                        )

                        return {
                                defaultPaymentMethod: paymentMethods[parsed.defaultPaymentMethod]
                                        ? parsed.defaultPaymentMethod
                                        : defaultState.defaultPaymentMethod,
                                defaultAddressId,
                                addresses,
                        }
                } catch (error) {
                        console.error('读取 LocalStorage 偏好设置失败:', error)
                        return buildInitialPreferences()
                }
        })

        useEffect(() => {
                localStorage.setItem(PREFERENCE_STORAGE_KEY, JSON.stringify(preferences))
        }, [preferences])

        const changeDefaultPaymentMethod = (methodKey) => {
                if (!paymentMethods[methodKey]) return

                setPreferences((prev) => ({
                        ...prev,
                        defaultPaymentMethod: methodKey,
                }))
        }

        const changeDefaultAddress = (addressId) => {
                setPreferences((prev) => {
                        if (!prev.addresses.some((item) => item.id === addressId)) {
                                return prev
                        }

                        return {
                                ...prev,
                                defaultAddressId: addressId,
                                addresses: prev.addresses.map((item) => ({
                                        ...item,
                                        isDefault: item.id === addressId,
                                })),
                        }
                })
        }

        const createAddress = (addressPayload) => {
                const normalized = normalizeAddress(addressPayload)
                if (!normalized) return null

                const newAddress = {
                        ...normalized,
                        id: normalized.id || `addr-${Date.now()}`,
                }

                setPreferences((prev) => {
                        const nextAddresses = [...prev.addresses, newAddress]
                        const targetDefaultId = newAddress.isDefault ? newAddress.id : prev.defaultAddressId || newAddress.id
                        const { addresses, defaultAddressId } = ensureSingleDefaultAddress(nextAddresses, targetDefaultId)

                        return {
                                ...prev,
                                defaultAddressId,
                                addresses,
                        }
                })

                return newAddress.id
        }

        const updateAddress = (addressId, updatedAddressPayload) => {
                setPreferences((prev) => {
                        const existing = prev.addresses.find((item) => item.id === addressId)
                        if (!existing) return prev

                        const updatedShipping = updatedAddressPayload?.shipping || {
                                name: updatedAddressPayload.name,
                                phone: updatedAddressPayload.phone,
                                address: updatedAddressPayload.address,
                                unitNo: updatedAddressPayload.unitNo,
                                postalCode: updatedAddressPayload.postalCode,
                        }

                        const mergedRawAddress = {
                                ...existing,
                                ...updatedAddressPayload,
                                shipping: {
                                        ...existing.shipping,
                                        ...updatedShipping,
                                },
                                id: addressId,
                        }

                        const nextAddress = normalizeAddress(mergedRawAddress)
                        if (!nextAddress) return prev

                        const nextAddresses = prev.addresses.map((item) =>
                                item.id === addressId ? nextAddress : item
                        )
                        const targetDefaultId = nextAddress.isDefault ? addressId : prev.defaultAddressId
                        const { addresses, defaultAddressId } = ensureSingleDefaultAddress(nextAddresses, targetDefaultId)

                        return {
                                ...prev,
                                defaultAddressId,
                                addresses,
                        }
                })
        }

        const deleteAddress = (addressId) => {
                setPreferences((prev) => {
                        const nextAddresses = prev.addresses.filter((item) => item.id !== addressId)
                        const { addresses, defaultAddressId } = ensureSingleDefaultAddress(nextAddresses, prev.defaultAddressId)

                        return {
                                ...prev,
                                defaultAddressId,
                                addresses,
                        }
                })
        }

        const getAddressById = (addressId) => {
                return preferences.addresses.find((item) => item.id === addressId)
        }

        const resetPreferences = () => {
                setPreferences(buildInitialPreferences())
        }

        return (
                <PreferenceContext.Provider
                        value={{
                                defaultPaymentMethod: preferences.defaultPaymentMethod,
                                defaultAddressId: preferences.defaultAddressId,
                                addresses: preferences.addresses,
                                changeDefaultPaymentMethod,
                                changeDefaultAddress,
                                createAddress,
                                updateAddress,
                                deleteAddress,
                                getAddressById,
                                resetPreferences,
                        }}
                >
                        {children}
                </PreferenceContext.Provider>
        )
}

export const usePreference = () => {
        return useContext(PreferenceContext)
}
