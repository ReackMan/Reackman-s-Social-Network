import { create } from 'react-test-renderer'
import { ProfileStatus } from 'features/profile/ui/profile-header/profile-status/index'

describe('profile-status Component', () => {
    it('should display status from props correctly', () => {
        const component = create(
            <ProfileStatus status="test" editable={true} updateUserStatus={() => {}} />,
        )
        const instance = component.getInstance()
        expect(instance?.props.status).toBe('test')
    })

    it('should display span when editMode equals false correctly', () => {
        const component = create(
            <ProfileStatus status="test" editable={true} updateUserStatus={() => {}} />,
        )
        const root = component.root
        // eslint-disable-next-line testing-library/await-async-query
        const span = root.findByType('span')
        expect(span).toBeTruthy()
    })

    it('should not display input when editMode equals false', () => {
        const component = create(
            <ProfileStatus status="test" editable={true} updateUserStatus={() => {}} />,
        )
        const root = component.root
        expect(() => {
            // eslint-disable-next-line testing-library/await-async-query
            root.findByType('input')
        }).toThrow()
    })

    it('should display input when editMode equals true correctly', () => {
        const component = create(
            <ProfileStatus status="test" editable={true} updateUserStatus={() => {}} />,
        )
        const root = component.root
        // eslint-disable-next-line testing-library/await-async-query
        const span = root.findByType('span')
        span.props.onDoubleClick()
        // eslint-disable-next-line testing-library/await-async-query
        const input = root.findByType('input')
        expect(input.props.value).toBe('test')
    })

    it('should not display span when editMode equals true correctly', () => {
        const component = create(
            <ProfileStatus status="test" editable={true} updateUserStatus={() => {}} />,
        )
        const root = component.root
        // eslint-disable-next-line testing-library/await-async-query
        const span = root.findByType('span')
        span.props.onDoubleClick()
        // eslint-disable-next-line testing-library/await-async-query
        expect(() => {
            // eslint-disable-next-line testing-library/await-async-query
            root.findByType('span')
        }).toThrow()
    })

    it('should call callback correctly', () => {
        const mockCallback = jest.fn()
        const component = create(
            <ProfileStatus status="test" editable={true} updateUserStatus={mockCallback} />,
        )
        const instance = component.getInstance()
        // @ts-ignore
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})
