interface EnquiryResponse {
  success: boolean
  message?: string
  doc?: any
  errors?: any
}

export async function createEnquiry(data: {
  packageRef: string
  packageTitle: string
  packageSlug: string
  mobileNumber: string
}): Promise<EnquiryResponse> {
  try {
    const response = await fetch('/api/enquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to submit enquiry',
        errors: result.errors,
      }
    }

    return {
      success: true,
      message: 'Enquiry submitted successfully!',
      doc: result.doc,
    }
  } catch (error) {
    console.error('Error creating enquiry:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    }
  }
}
